import React, { useCallback } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';
import { imageInputStyles as styles } from './ImageInput.styles';
import Label from '../../../common/components/inputs/Label';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';
import { pickImage } from './pickImage';
import { InputImage } from './types';
import { IMAGES } from '../../../common/assets';

type ImageInputProps = {
  value?: InputImage[];
  onChangeValue: (value: InputImage[]) => void;
};

const ImageInput: React.FC<ImageInputProps> = ({ value, onChangeValue }) => {
  const _onPressAdd = () => {
    pickImage().then((image) => {
      if (!image) {
        return;
      }

      // Check if same filename exists
      const foundIndex = value?.findIndex((val) => {
        return val.filename === image.filename;
      });
      if (foundIndex && foundIndex > -1) {
        return;
      }

      const copyValue = [...(value || [])];

      copyValue.push(image);
      onChangeValue(copyValue);
    });
  };

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
            placeholder={IMAGES.nopic_image()}
            contentFit="contain"
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
