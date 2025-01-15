import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { categorySearchStyles as styles } from './CategorySearch.styles';
import AppTextInput from '../../../common/components/inputs/AppTextInput';
import { useService } from '../../../common/services/useService';
import { searchCategories } from '../../services/searchCategories';
import { Category } from '../../types/category';
import Separator from '../../../common/components/separator/Separator';
import FullscreenLoading from '../../../common/components/feedbacks/FullscreenLoading';

type CategorySearchProps = {
  onSelectCategory: (category: Category) => void;
};

// TODO: error message behind modal
const CategorySearch: React.FC<CategorySearchProps> = ({ onSelectCategory }) => {
  const [searchText, setSearchText] = useState('');

  const { data, loading, request: search, reset: resetServiceState } = useService(searchCategories);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (searchText.length >= 2) {
        search({ searchText });
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search, searchText]);

  const _onPressCategory = useCallback(
    (category: Category) => {
      onSelectCategory(category);
      setSearchText('');
      resetServiceState();
    },
    [resetServiceState, onSelectCategory]
  );

  const _renderLoading = () => {
    return <FullscreenLoading style={styles.fullscreenLoading} />;
  };

  const _keyExtractor = useCallback((item: Category) => {
    return item.id.toString();
  }, []);

  const _renderCategoryItem = useCallback(
    (params: { item: Category }) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => _onPressCategory(params.item)}
        >
          <Text style={styles.categoryNameText}>{params.item.name}</Text>
        </TouchableOpacity>
      );
    },
    [_onPressCategory]
  );

  return (
    <View style={styles.container}>
      <AppTextInput
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Kategori aramak için en az 2 harf girin..."
      />
      {loading ? (
        _renderLoading()
      ) : (
        <FlatList
          data={data}
          keyExtractor={_keyExtractor}
          renderItem={_renderCategoryItem}
          ItemSeparatorComponent={Separator}
          ListEmptyComponent={data === null ? null : NoResult}
          style={styles.list}
        />
      )}
    </View>
  );
};

const NoResult = () => {
  return (
    <View style={styles.noResultContainer}>
      <Text style={styles.noResultText}>Böyle bir kategori bulunmuyor.</Text>
    </View>
  );
};

export default CategorySearch;
