import { toastConfig } from './src/common/components/toast/toastConfig';
import { Navigation } from './src/common/navigation/rootNavigator';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store } from './src/common/store';

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Toast config={toastConfig} />
    </Provider>
  );
}
