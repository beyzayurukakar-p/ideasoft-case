import { createStaticNavigation, StaticParamList } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from '../screens/landing-screen/LandingScreen';
import { storefrontNavigator } from './storefrontNavigator';
import { adminPanelNavigator } from './adminPanelNavigator';

const RootStack = createStackNavigator({
  screens: {
    Landing: LandingScreen,
    Storefront: storefrontNavigator,
    AdminPanel: adminPanelNavigator,
  },
  screenOptions: { headerShown: false },
});

export const Navigation = createStaticNavigation(RootStack);

type RootStackParamList = StaticParamList<typeof RootStack>;

// This is necessary to make the `RootParamList` type available globally.
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
