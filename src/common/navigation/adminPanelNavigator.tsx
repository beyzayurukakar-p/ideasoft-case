import ProductScreen from '../../admin-panel/screens/ProductScreen';
import CategoryScreen from '../../admin-panel/screens/CategoryScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { dimensions } from '../styling/dimensions';
import { COLORS } from '../styling/colors';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import CategoryDetailScreen from '../../admin-panel/screens/CategoryDetailScreen';
import { StaticParamList } from '@react-navigation/native';

const tabs = createBottomTabNavigator({
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

export const adminPanelNavigator = createStackNavigator({
  screens: {
    Tabs: {
      screen: tabs,
      options: {
        headerShown: false,
      },
    },
    CategoryDetail: {
      screen: CategoryDetailScreen,
      options: {
        title: 'Kategori Detayı',
        headerBackTitle: '',
        headerTitleStyle: {
          color: COLORS.subtextOnBackground,
        },
        headerTitleAlign: 'center',
      },
    },
  },
  screenOptions: {
    headerTintColor: COLORS.primary,
  },
});

type AdminPanelParamList = StaticParamList<typeof adminPanelNavigator>;

/**
 * Type to access stack navigator methods of useNavigation
 * @example useNavigation<ScreenNavigationProp<'ScreenName'>>()
 */
export type AdminPanelNavigationProp<RouteName extends keyof AdminPanelParamList> =
  StackNavigationProp<AdminPanelParamList, RouteName>;
