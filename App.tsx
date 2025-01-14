import { toastConfig } from './src/common/components/toast/toastConfig';
import { Navigation } from './src/common/navigation/rootNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/common/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { configureReanimatedLogger, ReanimatedLogLevel } from 'react-native-reanimated';
import { setDefaultOptions } from 'date-fns';
import { tr } from 'date-fns/locale';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false, // To disable reanimated warning logged by ReanimatedSwipeable.
});

setDefaultOptions({ locale: tr });

export default function App() {
  return (
    <Provider store={store}>
      <GestureHandlerRootView>
        <SafeAreaProvider>
          <Navigation />
          <Toast config={toastConfig} />
        </SafeAreaProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}
