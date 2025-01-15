import React from 'react';
import { View } from 'react-native';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import { categoryFormScreenStyles as styles } from './CategoryFormScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';
import FormActions from '../components/form-actions/FormActions';
import { StaticScreenProps } from '@react-navigation/native';
import { useCategoryForm } from '../hooks/useCategoryForm';

type ScreenProps = StaticScreenProps<{
  categoryId?: number;
}>;

const CategoryFormScreen: React.FC<ScreenProps> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const {
    formType,
    name,
    onChangeName,
    nameError,
    status,
    onChangeStatus,
    onPressAddUpdate,
    isLoading,
  } = useCategoryForm(categoryId);

  return (
    <View style={styles.container}>
      <AppTextInput
        label="İsim"
        value={name}
        onChangeText={onChangeName}
        placeholder="Kategorinin ismini yazın..."
        errorText={nameError}
      />
      <AppSwitch
        label="Durum"
        value={status}
        onValueChange={onChangeStatus}
      />
      <FormActions
        actionType={formType}
        onPressAction={onPressAddUpdate}
        isLoading={isLoading}
      />
    </View>
  );
};

export default CategoryFormScreen;
