import React from 'react';
import { View, Switch } from 'react-native';
import { COLORS } from '../../styling/colors';
import { appSwitchStyles as styles } from './AppSwitch.styles';
import Label from './Label';

type AppSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const AppSwitch: React.FC<AppSwitchProps> = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Label style={styles.label}>{label}</Label>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: COLORS.danger, true: COLORS.success }}
        thumbColor={value ? COLORS.textOnPrimary : COLORS.elevated}
      />
    </View>
  );
};

export default AppSwitch;
