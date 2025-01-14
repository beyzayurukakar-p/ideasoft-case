import { ActivityIndicator, View } from 'react-native';
import { detailActionsStyles as styles } from './DetailActions.styles';
import AppButton from '../../../common/components/button/AppButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TouchableText from '../../../common/components/button/TouchableText';
import { COLORS } from '../../../common/styling/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import React from 'react';

type DetailActionsProps = {
  onPressDelete: () => void;
  onPressEdit: () => void;
  isLoading?: boolean;
};

const DetailActions: React.FC<DetailActionsProps> = ({ onPressDelete, onPressEdit, isLoading }) => {
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
            <TouchableText
              label="Sil"
              onPress={onPressDelete}
              leftIcon={[FontAwesome5, 'trash-alt']}
              color={COLORS.dangerTextOnBackground}
            />
            <AppButton
              label="Düzenle"
              onPress={onPressEdit}
              leftIcon={[FontAwesome5, 'pen']}
              style={styles.editButton}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default DetailActions;
