import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import { categoryFormScreenStyles as styles } from './CategoryFormScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';
import FormActions from '../components/form-actions/FormActions';

const CategoryFormScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);

  return (
    <View style={styles.container}>
      <AppTextInput
        label="İsim"
        value={name}
        onChangeText={setName}
        placeholder="Kategorinin ismini yazın..."
      />
      <AppSwitch
        label="Durum"
        value={status}
        onValueChange={setStatus}
      />
      <FormActions
        actionType="update"
        onPressAction={() => {}}
        isLoading={false}
      />
    </View>
  );
};

export default CategoryFormScreen;
