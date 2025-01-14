import React from 'react';
import { View, Text, Switch } from 'react-native';
import { COLORS } from '../../styling/colors';
import { appSwitchStyles as styles } from './AppSwitch.styles';

type AppSwitchProps = {
  label: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
};

const AppSwitch: React.FC<AppSwitchProps> = ({ label, value, onValueChange }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
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
