import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { landingScreenStyles as styles } from './LandingScreen.styles';
import { useNavigation } from '@react-navigation/native';

const LandingScreen: React.FC = () => {
  const nav = useNavigation();

  const _onPressStorefront = () => {
    nav.navigate('Storefront');
  };

  const _onPressAdminPanel = () => {
    nav.navigate('AdminPanel');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={_onPressStorefront}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Storefront</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={_onPressAdminPanel}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Admin Panel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LandingScreen;
