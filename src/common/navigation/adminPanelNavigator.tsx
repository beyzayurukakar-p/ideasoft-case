import ProductScreen from '../../admin-panel/screens/products/ProductScreen';
import CategoryScreen from '../../admin-panel/screens/categories/CategoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { dimensions } from '../styling/dimensions';
import { COLORS } from '../styling/colors';

export const adminPanelNavigator = createBottomTabNavigator({
  screens: {
    Product: {
      screen: ProductScreen,
      options: {
        title: 'Ürünler',
      },
    },
    Category: {
      screen: CategoryScreen,
      options: {
        title: 'Kategoriler',
      },
    },
  },
  screenOptions: {
    tabBarPosition: 'top',
    tabBarIconStyle: { display: 'none' },
    tabBarLabelPosition: 'beside-icon',
    tabBarLabelStyle: { marginHorizontal: 0, fontSize: dimensions.measure(18) },
    headerShown: false,
    tabBarActiveTintColor: COLORS.primary,
  },
});
