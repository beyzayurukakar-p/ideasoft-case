import { ActivityIndicator, View } from 'react-native';
import { formActionsStyles as styles } from './FormActions.styles';
import AppButton from '../../../common/components/buttons/AppButton';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../../common/styling/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';
import { dimensions } from '../../../common/styling/dimensions';

type FormActionsProps = {
  actionType: 'add' | 'update';
  onPressAction: () => void;
  isLoading?: boolean;
};

const FormActions: React.FC<FormActionsProps> = ({ actionType, onPressAction, isLoading }) => {
  const { bottom } = useSafeAreaInsets();

  const _renderLoading = () => {
    return (
      <View style={[styles.innerContainer, styles.loadingInnerContainer]}>
        <ActivityIndicator
          color={COLORS.primary}
          size={'large'}
        />
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          paddingBottom: bottom + styles.container.paddingBottom,
        },
        isLoading ? styles.transparent : null,
      ]}
    >
      {isLoading ? (
        _renderLoading()
      ) : (
        <>
          <View style={styles.innerContainer}>
            <AppButton
              label={ACTION_LABELS[actionType]}
              onPress={onPressAction}
              leftIcon={ACTION_ICONS[actionType]}
              style={styles.editButton}
              leftIconSize={dimensions.measure(24)}
            />
          </View>
        </>
      )}
    </View>
  );
};

const ACTION_LABELS: Record<FormActionsProps['actionType'], any> = {
  add: 'Ekle',
  update: 'Güncelle',
};
const ACTION_ICONS: Record<FormActionsProps['actionType'], any> = {
  add: [MaterialCommunityIcons, 'plus'],
  update: [MaterialCommunityIcons, 'content-save-edit-outline'],
};

export default FormActions;
