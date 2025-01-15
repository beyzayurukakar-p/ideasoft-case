import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import { categoryFormScreenStyles as styles } from './CategoryFormScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';
import FormActions from '../components/form-actions/FormActions';
import { useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';

const CategoryFormScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const nav = useNavigation();

  const isLoading = useAppSelector(categorySelectors.isLoadingAddCategory);
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
      dispatch(
        categorySlice.actions.addCategory({
          category: {
            name,
            status: status ? 1 : 0,
          },
          onSuccess: () => {
            console.log('add successful, going back');
            nav.goBack();
          },
        })
      );
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
        isLoading={isLoading}
      />
    </View>
  );
};

export default CategoryFormScreen;
