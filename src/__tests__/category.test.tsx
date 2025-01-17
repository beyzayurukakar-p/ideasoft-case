import { cleanup, fireEvent, screen, userEvent, waitFor } from '@testing-library/react-native';
import { Navigation } from '../common/navigation/rootNavigator';
import { renderWithProviders } from '../common/test-utils/testUtils';
import { fullscreenLoadingTestID } from '../common/components/feedbacks/FullscreenLoading';
import axios from 'axios';
import { categoriesFirstPage } from '../common/test-utils/request-mock-data/getCategories';
import { retryButtonTestID } from '../common/components/feedbacks/FullscreenRetry';
import { UserEventInstance } from '@testing-library/react-native/build/user-event/setup';

const mockedAxios = axios as jest.Mocked<typeof axios>;

const navigateToCategoryList = async (user: UserEventInstance) => {
  await waitFor(() => {
    const adminPanelButton = screen.queryByText('Admin Panel');
    expect(adminPanelButton).toBeOnTheScreen();
    user.press(adminPanelButton);
  });

  await waitFor(() => {
    const categoryTabButton = screen.queryByText('Kategoriler');
    expect(categoryTabButton).toBeOnTheScreen();
    user.press(categoryTabButton);
  });
};

describe('Category List', () => {
  beforeEach(() => {
    renderWithProviders(<Navigation />);
  });
  afterEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
    //   jest.resetModules();
    cleanup();
  });
  it('renders loading indicator', async () => {
    mockedAxios.get.mockImplementationOnce(() => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(categoriesFirstPage);
        }, 1000);
      });
    });

    const user = userEvent.setup();
    await navigateToCategoryList(user);

    await waitFor(() => {
      const loadingIndicator = screen.queryByTestId(fullscreenLoadingTestID);
      expect(loadingIndicator).toBeOnTheScreen();
    });
  });
  it('renders try again when list read fails and tries again when pressed', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve, reject) => {
        if (url.includes('categories')) {
          mockFn();
          reject();
        } else {
          resolve([]);
        }
      });
    });

    const user = userEvent.setup();
    await navigateToCategoryList(user);

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const tryAgainButton = screen.queryByTestId(retryButtonTestID);
      expect(tryAgainButton).toBeOnTheScreen();

      user.press(tryAgainButton);
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
  it('refreshes when pulled down', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url.includes('categories')) {
          mockFn();
        }

        resolve({
          data: categoriesFirstPage,
        });
      });
    });

    const user = userEvent.setup();
    await navigateToCategoryList(user);

    await waitFor(() => {
      const scrollview = screen.getByTestId('category-list');
      expect(scrollview).toBeOnTheScreen();
      fireEvent(scrollview, 'refresh');
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
  it('loads more when end of list is reached', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url.includes('categories?page=2')) {
          mockFn();
        }

        resolve({
          data: url.includes('page=1') ? categoriesFirstPage : [],
        });
      });
    });

    const user = userEvent.setup();
    await navigateToCategoryList(user);

    await waitFor(() => {
      const scrollview = screen.getByTestId('category-list');
      expect(scrollview).toBeOnTheScreen();
      fireEvent(scrollview, 'endReached');
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
  it.todo('deletes a product when pressed on delete button');
  it.todo('navigates to Detail Screen when pressed on a category');
  it.todo('navigates to Add Form when pressed on plus button');
});
