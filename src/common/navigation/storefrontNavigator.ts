import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../storefront/screens/home/HomeScreen';
import StorefrontHeaderLeft from './components/StorefrontHeaderLeft';
import HeaderRightSwitch from './components/HeaderRightSwitch';

export const storefrontNavigator = createStackNavigator({
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        headerLeft: StorefrontHeaderLeft,
        headerTitle: () => null,
        headerRight: HeaderRightSwitch,
      },
    },
  },
});
