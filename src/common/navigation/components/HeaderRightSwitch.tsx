import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { headerRightSwitchStyles as styles } from './HeaderRightSwitch.styles';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';
import { RootStackNavigationProp } from '../rootNavigator';

/**
 * Renders a touchable icon that navigates back to the 'Landing' screen.
 */
const HeaderRightSwitch = () => {
  const navigation = useNavigation<RootStackNavigationProp>();

  const _onPress = () => {
    navigation.popTo('Landing');
  };

  return (
    <TouchableOpacity
      onPress={_onPress}
      style={styles.container}
    >
      <FontAwesome6
        name="arrow-right-arrow-left"
        size={dimensions.measure(24)}
        color={COLORS.textOnBackground}
      />
    </TouchableOpacity>
  );
};

export default HeaderRightSwitch;
