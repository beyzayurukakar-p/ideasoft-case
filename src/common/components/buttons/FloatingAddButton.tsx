import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { floatingAddButtonStyles as styles } from './FloatingAddButton.styles';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type FloatingAddButtonProps = {
  onPress: () => void;
  testID?: string;
};

/**
 * FloatingAddButton component renders a floating button with a plus icon.
 * It is typically used to trigger an action, such as adding a new item.
 */
const FloatingAddButton: React.FC<FloatingAddButtonProps> = ({ onPress, testID }) => {
  const { bottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        {
          bottom: styles.container.bottom + bottom,
        },
      ]}
    >
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={styles.touchable}
        testID={testID}
      >
        <FontAwesome5
          name="plus"
          size={dimensions.measure(35)}
          color={COLORS.textOnPrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default FloatingAddButton;
