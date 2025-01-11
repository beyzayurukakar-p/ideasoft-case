import { View } from 'react-native';
import { toastConfig } from './src/common/components/toast/toastConfig';
import { Navigation } from './src/common/navigation/rootNavigator';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <Navigation />
      <Toast config={toastConfig} />
    </View>
  );
}
