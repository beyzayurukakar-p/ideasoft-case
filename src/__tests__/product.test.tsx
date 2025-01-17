import { cleanup, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { Navigation } from '../common/navigation/rootNavigator';
import { renderWithProviders } from '../common/test-utils/testUtils';
import { fullscreenLoadingTestID } from '../common/components/feedbacks/FullscreenLoading';
import axios from 'axios';
import { productsFirstPage } from '../common/test-utils/request-mock-data/getProducts';
import { retryButtonTestID } from '../common/components/feedbacks/FullscreenRetry';

const mockedAxios = axios as jest.Mocked<typeof axios>;

const navigateToProductList = async () => {
  await waitFor(() => {
    const adminPanelButton = screen.queryByText('Admin Panel');
    expect(adminPanelButton).toBeOnTheScreen();
    fireEvent.press(adminPanelButton);
  });
};

describe('Product List', () => {
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
        if (url.includes('products')) {
          setTimeout(() => {
            resolve({ data: productsFirstPage });
          }, 1000);
        } else {
          resolve({ data: [] });
        }
      });
    });

    await navigateToProductList();

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
        if (url.includes('products')) {
          mockFn();
          reject();
        } else {
          resolve({ data: [] });
        }
      });
    });

    await navigateToProductList();

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
        if (url.includes('products')) {
          mockFn();
          resolve({
            data: productsFirstPage,
          });
        } else {
          resolve({ data: [] });
        }
      });
    });

    await navigateToProductList();

    await waitFor(() => {
      const scrollview = screen.getByTestId('product-list');
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
        if (url.includes('products')) {
          mockFn();
          resolve({
            data: url.includes('page=1') ? productsFirstPage : [],
          });
        } else {
          resolve({
            data: [],
          });
        }
      });
    });

    await navigateToProductList();

    await waitFor(() => {
      const scrollview = screen.getByTestId('product-list');
      expect(scrollview).toBeOnTheScreen();
      fireEvent(scrollview, 'endReached');
    });

    await waitFor(() => {
      expect(mockFn).toHaveBeenCalledTimes(1);
    });
  });
  it('deletes a product when pressed on delete button', async () => {
    const mockFn = jest.fn();
    mockedAxios.get.mockResolvedValue({ data: productsFirstPage });
    mockedAxios.delete.mockImplementation(() => {
      mockFn();
      return Promise.resolve({ data: true });
    });

    await navigateToProductList();

    // Find an item
    const { id } = productsFirstPage[0];

    // Press the delete button
    await waitFor(() => {
      const itemDeleteButton = screen.queryByTestId(`delete-product-${id}`);
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
      const item = screen.queryByTestId(`product-item-${id}`);
      expect(item).toBeOnTheScreen();
      const itemDeleteButton = screen.queryByTestId(`delete-product-${id}`);
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
      const item = screen.queryByTestId(`product-item-${id}`);
      expect(item).toBeNull();
    });
  });
  it('navigates to Detail Screen when pressed on a product', async () => {
    mockedAxios.get.mockResolvedValue({ data: productsFirstPage });

    await navigateToProductList();

    // Find an item
    const { id } = productsFirstPage[1];

    // Press item
    await waitFor(() => {
      const item = screen.queryByTestId(`product-item-${id}`);
      expect(item).toBeOnTheScreen();
      fireEvent.press(item);
    });

    await waitFor(() => {
      expect(screen.queryByText('Ürün Detayı')).toBeOnTheScreen();
    });
  });
  it('navigates to Add Form when pressed on plus button', async () => {
    mockedAxios.get.mockResolvedValue({ data: productsFirstPage });

    await navigateToProductList();

    // Press item
    await waitFor(() => {
      const item = screen.queryByTestId(`product-add-button`);
      expect(item).toBeOnTheScreen();
      fireEvent.press(item);
    });

    await waitFor(() => {
      expect(screen.queryByText('Yeni Ürün')).toBeOnTheScreen();
      expect(screen.queryByText('İsim')).toBeOnTheScreen();
      expect(screen.queryByText('Durum')).toBeOnTheScreen();
      expect(screen.queryByText('Ekle')).toBeOnTheScreen();
    });
  });
});
