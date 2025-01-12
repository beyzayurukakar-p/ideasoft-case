import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { floatingAddButtonStyles as styles } from './FloatingAddButton.styles';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FloatingAddButtonProps = {
  onPress: () => void;
};
const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onPress }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.touchableContainer,
        {
          bottom: styles.touchableContainer.bottom + bottom,
        },
      ]}
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
