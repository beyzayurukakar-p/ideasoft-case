import React from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IMAGES } from '../../assets';
import { storefrontHeaderLeftStyles as styles } from './StorefrontHeaderLeft.styles';
import { RootStackNavigationProp } from '../rootNavigator';

/**
 * Renders the storefront logo that navigates back to the 'Home' screen.
 */
const StorefrontHeaderLeft = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const _onPress = () => {
    navigation.popTo('Storefront', { screen: 'Home' });
  };

  return (
    <TouchableOpacity
      onPress={_onPress}
      style={styles.container}
    >
      <Image
        source={IMAGES.logo()}
        style={styles.image}
      />
    </TouchableOpacity>
  );
};

export default StorefrontHeaderLeft;
