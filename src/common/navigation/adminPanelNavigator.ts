import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../admin-panel/screens/home/HomeScreen';

export const adminPanelNavigator = createStackNavigator({
  screens: {
    Home: HomeScreen,
  },
});
