import React, { useCallback } from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { imageInputStyles as styles } from './ImageInput.styles';
import Label from '../../../common/components/inputs/Label';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';
import { ProductImage, ProductImageRequest } from '../../types/product';

export type InputImage = Partial<
  Pick<ProductImageRequest & ProductImage, 'url' | 'id' | 'sortOrder' | 'attachment'>
> &
  Omit<ProductImageRequest & ProductImage, 'url' | 'id' | 'sortOrder' | 'attachment'>;

type ImageInputProps = {
  value?: InputImage[];
  onChangeValue: (value: InputImage[]) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({ value, onChangeValue }) => {
  const _onPressAdd = () => {};

  const _onPressDelete = useCallback(
    (filename: string) => {
      // Removes category
      const copyValue: InputImage[] = [];
      value?.forEach((image) => {
        if (image.filename === filename) {
          return;
        }

        copyValue.push(image);
      });

      onChangeValue(copyValue);
    },
    [value, onChangeValue]
  );

  const _renderImageItem = useCallback(
    ({ item: image }: { item: InputImage }) => {
      return (
        <View style={styles.itemContainer}>
          <Image
            source={{ uri: image.url }}
            style={styles.image}
          />
          <TouchableOpacity
            style={styles.imageDeleteTouchable}
            onPress={() => _onPressDelete(image.filename)}
          >
            <FontAwesome5
              name="trash-alt"
              size={dimensions.measure(24)}
              color={COLORS.textOnPrimary}
            />
          </TouchableOpacity>
        </View>
      );
    },
    [_onPressDelete]
  );

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Label>Görseller</Label>
        <TouchableOpacity
          style={styles.addTouchable}
          activeOpacity={0.5}
          onPress={_onPressAdd}
        >
          <MaterialCommunityIcons
            name={'plus'}
            size={dimensions.measure(30)}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={value}
        keyExtractor={(image) => image.filename}
        renderItem={_renderImageItem}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default ImageInput;
