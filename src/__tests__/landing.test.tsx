import { screen, userEvent } from '@testing-library/react-native';
import { Navigation } from '../common/navigation/rootNavigator';
import { renderWithProviders } from '../common/utils/testUtils';

describe('Landing Screen', () => {
  beforeEach(() => {
    renderWithProviders(<Navigation />);
  });

  it('renders', async () => {
    const storefrontButton = await screen.findByText('Storefront');
    const adminPanelButton = await screen.findByText('Admin Panel');
    expect(storefrontButton).toBeDefined();
    expect(adminPanelButton).toBeDefined();
  });

  it('navigates to storefront when storefront button is pressed', async () => {
    renderWithProviders(<Navigation />);
    const user = userEvent.setup();

    const storefrontButton = await screen.findByText('Storefront');
    user.press(storefrontButton);

    const storefrontHomeText = await screen.findByText('Welcome to the storefront home screen.');
    expect(storefrontHomeText).toBeDefined();
  });

  it('navigates to admin panel when admin panel button is pressed', async () => {
    const user = userEvent.setup();

    const adminPanelButton = await screen.findByText('Admin Panel');
    user.press(adminPanelButton);

    const adminPanelTabProduct = await screen.findByText('Ürünler');
    expect(adminPanelTabProduct).toBeDefined();
  });
});
