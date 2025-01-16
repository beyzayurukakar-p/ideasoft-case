import * as ImagePicker from 'expo-image-picker';
import { SelectedProductImage } from './types';
import Toast from 'react-native-toast-message';
import { GENERIC_ERROR_MESSAGE } from '../../../common/services/constants';

export const pickImage = async (): Promise<SelectedProductImage | null> => {
  return ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    base64: true,
  })
    .then((result) => {
      if (!result.canceled) {
        const asset = result.assets[0];
        if (!asset.base64) {
          return null;
        }
        const filenameAndExtension = asset.fileName || '';
        const indexOfDot = filenameAndExtension.indexOf('.');
        const filename = filenameAndExtension.substring(0, indexOfDot);
        const extension = filenameAndExtension.substring(indexOfDot + 1);

        const image: SelectedProductImage = {
          filename,
          extension,
          attachment: 'data:image/jpeg;base64,' + asset.base64,
          url: asset.uri,
        };

        return image;
      }

      return null;
    })
    .catch(() => {
      Toast.show({
        type: 'error',
        text1: GENERIC_ERROR_MESSAGE,
      });
      return null;
    });
};
