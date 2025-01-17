import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { categorySearchStyles as styles } from './CategorySearch.styles';
import AppTextInput from '../../../common/components/inputs/AppTextInput';
import { useService } from '../../../common/services/useService';
import { searchCategories } from '../../services/searchCategories';
import { Category } from '../../types/category';
import Separator from '../../../common/components/separator/Separator';
import FullscreenLoading from '../../../common/components/feedbacks/FullscreenLoading';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

type CategorySearchProps = {
  onSelectCategory: (category: Category) => void;

  /** Callback function to handle the request to close the search modal */
  onRequestClose: () => void;
};

/**
 * CategorySearch component allows users to search for categories and select one from the search results.
 * It displays a search input and a list of categories matching the search text.
 */
const CategorySearch: React.FC<CategorySearchProps> = ({ onSelectCategory, onRequestClose }) => {
  const [searchText, setSearchText] = useState('');

  const { data, loading, request: search, reset: resetServiceState } = useService(searchCategories);

  useEffect(() => {
    // Search text debounce
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
      // Call callback that handles category selection
      onSelectCategory(category);

      // Reset state
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
        style={styles.input}
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
          contentContainerStyle={styles.listContentContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Close Button */}
      <TouchableOpacity
        style={styles.closeIconContainer}
        activeOpacity={0.5}
        onPress={onRequestClose}
        hitSlop={{ bottom: 20, top: 20, left: 20, right: 20 }}
      >
        <MaterialCommunityIcons
          name="close"
          size={dimensions.measure(30)}
          color={COLORS.subtextOnBackground}
        />
      </TouchableOpacity>
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
