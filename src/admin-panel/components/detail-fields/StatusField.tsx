import { Text, View } from 'react-native';
import { detailFieldStyles as styles } from './detailFieldStyles';
import { COLORS } from '../../../common/styling/colors';

type StatusFieldProps = {
  label: string;
  status?: number;
};

/**
 * A component that displays a label and a status circle (green or red) in a horizontal layout.
 * It is used to display the status field in detail screens `CategoryDetailScreen` and `ProductDetailScreen`.
 */
const StatusField: React.FC<StatusFieldProps> = ({ label, status }) => {
  const isActive = status === 1;

  return (
    <View style={styles.labelValueContainerHorizontal}>
      <Text style={styles.labelText}>{label}</Text>
      <View style={styles.statusContainer}>
        <Text
          style={[
            styles.valueText,
            {
              color: isActive ? COLORS.successTextOnBackground : COLORS.dangerTextOnBackground,
            },
          ]}
        >
          {isActive ? 'Aktif' : 'İnaktif'}
        </Text>
        <View
          style={[
            styles.statusCircle,
            {
              backgroundColor: isActive ? COLORS.success : COLORS.danger,
            },
          ]}
        />
      </View>
    </View>
  );
};

export default StatusField;
