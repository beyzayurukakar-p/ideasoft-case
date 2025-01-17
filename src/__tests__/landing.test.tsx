import { screen, userEvent, waitFor } from '@testing-library/react-native';
import { Navigation } from '../common/navigation/rootNavigator';
import { renderWithProviders } from '../common/test-utils/testUtils';

describe('Landing Screen', () => {
  beforeEach(() => {
    renderWithProviders(<Navigation />);
  });

  it('renders', async () => {
    await waitFor(() => {
      const storefrontButton = screen.queryByText('Storefront');
      expect(storefrontButton).toBeOnTheScreen();
    });

    await waitFor(() => {
      const adminPanelButton = screen.queryByText('Admin Panel');
      expect(adminPanelButton).toBeOnTheScreen();
    });
  });

  it('navigates to storefront when storefront button is pressed', async () => {
    const user = userEvent.setup();

    let storefrontButton;
    await waitFor(() => {
      storefrontButton = screen.queryByText('Storefront');
      expect(storefrontButton).toBeOnTheScreen();
    });

    if (storefrontButton) {
      user.press(storefrontButton);
    }

    await waitFor(() => {
      const storefrontHomeText = screen.queryByText('Welcome to the storefront home screen.');
      expect(storefrontHomeText).toBeOnTheScreen();
    });
  });

  it('navigates to admin panel when admin panel button is pressed', async () => {
    const user = userEvent.setup();

    let adminPanelButton;
    await waitFor(() => {
      adminPanelButton = screen.queryByText('Admin Panel');
      expect(adminPanelButton).toBeOnTheScreen();
    });

    if (adminPanelButton) {
      user.press(adminPanelButton);
    }

    await waitFor(() => {
      const adminPanelTabProduct = screen.queryByText('Ürünler');
      expect(adminPanelTabProduct).toBeOnTheScreen();
    });
  });
});
