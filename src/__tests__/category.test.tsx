import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Navigation } from '../common/navigation/rootNavigator';
import { renderWithProviders } from '../common/test-utils/testUtils';
import { fullscreenLoadingTestID } from '../common/components/feedbacks/FullscreenLoading';
import axios from 'axios';
import { categoriesFirstPage } from '../common/test-utils/request-mock-data/getCategories';
import { retryButtonTestID } from '../common/components/feedbacks/FullscreenRetry';

const mockedAxios = axios as jest.Mocked<typeof axios>;

const navigateToCategoryList = async () => {
  await waitFor(() => {
    const adminPanelButton = screen.queryByText('Admin Panel');
    expect(adminPanelButton).toBeOnTheScreen();
    fireEvent.press(adminPanelButton);
  });

  await waitFor(() => {
    const categoryTabButton = screen.queryByText('Kategoriler');
    expect(categoryTabButton).toBeOnTheScreen();
    fireEvent.press(categoryTabButton);
  });
};

describe('Category List', () => {
  beforeEach(() => {
    renderWithProviders(<Navigation />);
    mockedAxios.get.mockReset();
  });
  afterEach(() => {
    cleanup();
  });
  it('renders loading indicator', async () => {
    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url.includes('categories')) {
          setTimeout(() => {
            resolve({ data: categoriesFirstPage });
          }, 1000);
        } else {
          resolve({ data: [] });
        }
      });
    });

    await navigateToCategoryList();

    await waitFor(
      () => {
        const loadingIndicator = screen.queryByTestId(fullscreenLoadingTestID);
        expect(loadingIndicator).toBeOnTheScreen();
      },
      {
        interval: 100,
        timeout: 1000,
      }
    );
  });
  it('renders try again when list read fails and tries again when pressed', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockClear();
    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve, reject) => {
        if (url.includes('categories')) {
          mockFn();
          reject();
        } else {
          resolve({ data: [] });
        }
      });
    });

    await navigateToCategoryList();

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      const tryAgainButton = screen.queryByTestId(retryButtonTestID);
      expect(tryAgainButton).toBeOnTheScreen();

      fireEvent.press(tryAgainButton);
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(2);
    });
  });
  it('refreshes when pulled down', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockClear();
    mockedAxios.get.mockImplementation((url: string) => {
      return new Promise((resolve) => {
        if (url.includes('categories')) {
          mockFn();
          resolve({
            data: categoriesFirstPage,
          });
        } else {
          resolve({ data: [] });
        }
      });
    });

    await navigateToCategoryList();

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
        if (url.includes('categories')) {
          mockFn();
          resolve({
            data: url.includes('page=1') ? categoriesFirstPage : [],
          });
        } else {
          resolve({
            data: [],
          });
        }
      });
    });

    await navigateToCategoryList();

    await waitFor(() => {
      const scrollview = screen.getByTestId('category-list');
      expect(scrollview).toBeOnTheScreen();
      fireEvent(scrollview, 'endReached');
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
  it('deletes a product when pressed on delete button', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockResolvedValue({ data: categoriesFirstPage });
    mockedAxios.delete.mockImplementation(() => {
      mockFn();
      return Promise.resolve({ data: true });
    });

    await navigateToCategoryList();

    // Find an item
    const { id } = categoriesFirstPage[0];

    // Press the delete button
    await waitFor(() => {
      const itemDeleteButton = screen.queryByTestId(`delete-category-${id}`);
      expect(itemDeleteButton).toBeOnTheScreen();
      fireEvent.press(itemDeleteButton);
    });

    // Press cancel on warning modal
    await waitFor(() => {
      const cancelButton = screen.queryByTestId('warning-modal-cancel');
      expect(cancelButton).toBeOnTheScreen();
      fireEvent.press(cancelButton);
    });

    // Expect item to be still there and press the delete button
    await waitFor(() => {
      const item = screen.queryByTestId(`category-item-${id}`);
      expect(item).toBeOnTheScreen();
      const itemDeleteButton = screen.queryByTestId(`delete-category-${id}`);
      expect(itemDeleteButton).toBeOnTheScreen();
      fireEvent.press(itemDeleteButton);
    });

    // Press delete on warning modal
    await waitFor(() => {
      const deleteButton = screen.queryByTestId('warning-modal-delete');
      expect(deleteButton).toBeOnTheScreen();
      fireEvent.press(deleteButton);
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalled();
      const item = screen.queryByTestId(`category-item-${id}`);
      expect(item).toBeNull();
    });
  });
  it('navigates to Detail Screen when pressed on a category', async () => {
    mockedAxios.get.mockResolvedValue({ data: categoriesFirstPage });

    await navigateToCategoryList();

    // Find an item
    const { id } = categoriesFirstPage[1];

    // Press item
    await waitFor(() => {
      const item = screen.queryByTestId(`category-item-${id}`);
      expect(item).toBeOnTheScreen();
      fireEvent.press(item);
    });

    await waitFor(() => {
      expect(screen.queryByText('Kategori Detayı')).toBeOnTheScreen();
    });
  });
  it('navigates to Add Form when pressed on plus button', async () => {
    mockedAxios.get.mockResolvedValue({ data: categoriesFirstPage });

    await navigateToCategoryList();

    // Press item
    await waitFor(() => {
      const item = screen.queryByTestId(`category-add-button`);
      expect(item).toBeOnTheScreen();
      fireEvent.press(item);
    });

    await waitFor(() => {
      expect(screen.queryByText('Yeni Kategori')).toBeOnTheScreen();
      expect(screen.queryByText('İsim')).toBeOnTheScreen();
      expect(screen.queryByText('Durum')).toBeOnTheScreen();
      expect(screen.queryByText('Ekle')).toBeOnTheScreen();
    });
  });
});
