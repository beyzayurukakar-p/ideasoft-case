import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const HomeScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <WebView
        source={{ uri: 'https://testcase.myideasoft.com/' }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default HomeScreen;
