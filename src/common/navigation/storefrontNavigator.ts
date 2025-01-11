import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../storefront/screens/home/HomeScreen';

export const storefrontNavigator = createStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});
