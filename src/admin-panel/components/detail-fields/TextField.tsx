import { Text, View } from 'react-native';
import { detailFieldStyles as styles } from './detailFieldStyles';

type TextFieldProps = {
  label: string;
  value?: string;
  /** Larger font size for value text */
  largeValue?: boolean;
  /** Render value with a custom component */
  renderValue?: () => JSX.Element;
};

/**
 * A component that displays a label and a value in a vertical layout.
 * It is used to display various text fields in detail screens `CategoryDetailScreen` and `ProductDetailScreen`.
 */
const TextField: React.FC<TextFieldProps> = ({ label, value, largeValue, renderValue }) => {
  return (
    <View style={styles.labelValueContainerVertical}>
      <Text style={styles.labelText}>{label}</Text>
      {renderValue ? (
        renderValue()
      ) : (
        <Text style={largeValue ? styles.valueTextLarge : styles.valueText}>{value}</Text>
      )}
    </View>
  );
};

export default TextField;
