import { toastConfig } from './src/common/components/toast/toastConfig';
import { Navigation } from './src/common/navigation/rootNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/common/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
        <Toast config={toastConfig} />
      </SafeAreaProvider>
    </Provider>
  );
}
