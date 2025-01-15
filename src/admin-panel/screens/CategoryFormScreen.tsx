import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import { categoryFormScreenStyles as styles } from './CategoryFormScreen.styles';
import AppSwitch from '../../common/components/inputs/AppSwitch';
import FormActions from '../components/form-actions/FormActions';
import { StaticScreenProps, useNavigation } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';

type ScreenProps = StaticScreenProps<{
  categoryId?: number;
}>;

const CategoryFormScreen: React.FC<ScreenProps> = ({
  route: {
    params: { categoryId },
  },
}) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();

  const isAddLoading = useAppSelector(categorySelectors.isLoadingAddCategory);
  const isUpdateLoading = useAppSelector(categorySelectors.isLoadingUpdateCategory);

  const category = useAppSelector((state) =>
    categoryId ? categorySelectors.categoryById(state, categoryId) : undefined
  );
  const formType = category ? 'update' : 'add';

  const [name, setName] = useState<string | undefined>(category?.name || undefined);
  const [status, setStatus] = useState<boolean>(
    category?.status !== undefined ? category?.status === 1 : true
  );

  const [nameValidationError, setNameValidationError] = useState<string | null>(null);

  const _validate = (callback: () => void) => {
    if (!name || name.trim().length === 0) {
      setNameValidationError('Bu alan zorunludur.');
    } else {
      callback();
    }
  };

  const _onPressAddUpdate = () => {
    _validate(() => {
      const _onSuccess = () => {
        nav.popTo('AdminPanel', {
          screen: 'Tabs',
          params: {
            screen: 'Category',
          },
        });
      };
      const _formData = {
        name: (name as string).trim(),
        status: status ? 1 : 0,
      };

      if (formType === 'add') {
        dispatch(
          categorySlice.actions.addCategory({
            category: _formData,
            onSuccess: _onSuccess,
          })
        );
      } else if (formType === 'update') {
        dispatch(
          categorySlice.actions.updateCategory({
            category: {
              ..._formData,
              id: category?.id as number,
            },
            onSuccess: _onSuccess,
          })
        );
      }
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
        actionType={category ? 'update' : 'add'}
        onPressAction={_onPressAddUpdate}
        isLoading={category ? isUpdateLoading : isAddLoading}
      />
    </View>
  );
};

export default CategoryFormScreen;
