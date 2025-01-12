import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { floatingAddButtonStyles as styles } from './FloatingAddButton.styles';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';

type FloatingAddButtonProps = {
  onPress: () => void;
};
const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.touchableContainer}
    >
      <View style={styles.innerContainer}>
        <FontAwesome5
          name="plus"
          size={dimensions.measure(35)}
          color={COLORS.textOnPrimary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default FloatingAddButton;
