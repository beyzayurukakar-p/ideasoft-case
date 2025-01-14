import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import { categoryFormScreenStyles as styles } from './CategoryFormScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';
import FormActions from '../components/form-actions/FormActions';

const CategoryFormScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [status, setStatus] = useState<boolean>(true);

  const [nameValidationError, setNameValidationError] = useState<string | null>(null);

  const _validate = (callback: () => void) => {
    if (name.length === 0) {
      setNameValidationError('Bu alan zorunludur.');
    } else {
      callback();
    }
  };

  const _onPressAddUpdate = () => {
    _validate(() => {
      console.log({ name, status });
    });
  };

  const _onChangeName = (text: string) => {
    setName(text);
    setNameValidationError(null);
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        label="İsim"
        value={name}
        onChangeText={_onChangeName}
        placeholder="Kategorinin ismini yazın..."
        errorText={nameValidationError}
      />
      <AppSwitch
        label="Durum"
        value={status}
        onValueChange={setStatus}
      />
      <FormActions
        actionType="add"
        onPressAction={_onPressAddUpdate}
        isLoading={false}
      />
    </View>
  );
};

export default CategoryFormScreen;
