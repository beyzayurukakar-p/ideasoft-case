import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../common/store';
import { categorySelectors, categorySlice } from '../states/categorySlice';
import { useNavigation } from '@react-navigation/native';
import { RootStackNavigationProp } from '../../common/navigation/rootNavigator';

export const useCategoryForm = (categoryId?: number) => {
  const dispatch = useAppDispatch();
  const nav = useNavigation<RootStackNavigationProp>();

  // Values selected from redux state
  const isAddLoading = useAppSelector(categorySelectors.isLoadingAddCategory);
  const isUpdateLoading = useAppSelector(categorySelectors.isLoadingUpdateCategory);
  const category = useAppSelector((state) =>
    categoryId ? categorySelectors.categoryById(state, categoryId) : undefined
  );

  // States
  const [name, setName] = useState<string | undefined>(category?.name || undefined);
  const [status, setStatus] = useState<boolean>(
    category?.status !== undefined ? category?.status === 1 : true
  );
  const [nameValidationError, setNameValidationError] = useState<string | null>(null);

  // Derived values
  const formType: 'update' | 'add' = categoryId ? 'update' : 'add';
  const isLoading = formType === 'add' ? isAddLoading : isUpdateLoading;

  // Set screen title
  useEffect(() => {
    nav.setOptions({
      title: formType === 'add' ? 'Yeni Kategori' : 'Kategori Düzenle',
    });
  }, [nav, formType]);

  // Form validation
  const _validate = (callback: () => void) => {
    if (!name || name.trim().length === 0) {
      setNameValidationError('Bu alan zorunludur.');
    } else {
      callback();
    }
  };

  const _onChangeName = (text: string) => {
    setName(text);
    setNameValidationError(null);
  };

  // Add action
  const _add = () => {
    _validate(() => {
      dispatch(
        categorySlice.actions.addCategory({
          category: {
            name: (name as string).trim(),
            status: status ? 1 : 0,
          },
          onSuccess: nav.goBack,
        })
      );
    });
  };

  // Update action
  const _update = () => {
    _validate(() => {
      dispatch(
        categorySlice.actions.updateCategory({
          category: {
            name: (name as string).trim(),
            status: status ? 1 : 0,
            id: categoryId as number,
          },
          onSuccess: nav.goBack,
        })
      );
    });
  };

  const _onPressAddUpdate = () => {
    formType === 'add' ? _add() : _update();
  };

  return {
    formType,

    name,
    onChangeName: _onChangeName,
    nameError: nameValidationError,

    status,
    onChangeStatus: setStatus,

    isLoading,
    onPressAddUpdate: _onPressAddUpdate,
  };
};
