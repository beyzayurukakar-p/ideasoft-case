import React, { PropsWithChildren, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { swipeableWithDeleteStyles as styles } from './SwipeableWithDelete.styles';
import { COLORS } from '../../styling/colors';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { dimensions } from '../../styling/dimensions';

type SwipeableWithDeleteProps = PropsWithChildren<{
  /** Should demonstrate swipeability for users when component mounts? */
  demonstrateOnStart: boolean;

  onPressDelete?: () => void;
  disabled?: boolean;
  testID?: string;
}>;

/**
 * A component that wraps its children with a swipeable container,
 * allowing users to swipe left to reveal a delete button.
 * It can demonstrate swipeability on mount and handle delete actions.
 */
const SwipeableWithDelete: React.FC<SwipeableWithDeleteProps> = ({
  children,
  demonstrateOnStart,
  onPressDelete,
  disabled,
  testID,
}) => {
  // To prevent re-demonstration when this value changes, keep it in ref
  const demonstrateOnStartRef = useRef(demonstrateOnStart);

  const swipeableRef = useRef<Swipeable>(null);

  useEffect(() => {
    // Demonstration on mount
    if (!demonstrateOnStartRef.current) return;
    setTimeout(() => {
      swipeableRef?.current?.openRight();

      setTimeout(() => {
        swipeableRef?.current?.close();
      }, 700);
    }, 300);
  }, []);

  const _onSwipeableOpen = () => {
    // Close swipeable back 2 seconds after user opens it
    setTimeout(() => {
      swipeableRef?.current?.close();
    }, 2000);
  };

  const _onPressDelete = () => {
    onPressDelete?.();
    swipeableRef.current?.close();
  };

  const _renderRightActions = () => {
    return (
      <TouchableOpacity
        onPress={_onPressDelete}
        style={styles.deleteTouchable}
        disabled={disabled}
        testID={testID}
      >
        <FontAwesome5
          name="trash-alt"
          size={dimensions.measure(20)}
          color={COLORS.textOnPrimary}
        />
      </TouchableOpacity>
    );
  };

  return (
    // Using deprecated component
    // because there is an unfixed bug on new component (ReanimatedSwipeable)
    // that prevents running animations on mount
    <Swipeable
      renderRightActions={_renderRightActions}
      onSwipeableOpen={_onSwipeableOpen}
      ref={swipeableRef}
    >
      {children}
    </Swipeable>
  );
};

export default SwipeableWithDelete;
