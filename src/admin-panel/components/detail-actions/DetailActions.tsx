import { View } from 'react-native';
import { detailActionsStyles as styles } from './DetailActions.styles';
import AppButton from '../../../common/components/button/AppButton';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import TouchableText from '../../../common/components/button/TouchableText';
import { COLORS } from '../../../common/styling/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type DetailActionsProps = {
  onPressDelete: () => void;
  onPressEdit: () => void;
};

const DetailActions: React.FC<DetailActionsProps> = ({ onPressDelete, onPressEdit }) => {
  const { bottom } = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.container,
        {
          marginBottom: bottom,
        },
      ]}
    >
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
  );
};

export default DetailActions;
