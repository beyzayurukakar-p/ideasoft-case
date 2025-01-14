import React, { useState } from 'react';
import { View } from 'react-native';
import AppTextInput from '../../common/components/inputs/AppTextInput';
import { categoryFormScreenStyles as styles } from './CategoryFormScreen.styles';

const CategoryFormScreen: React.FC = () => {
  const [name, setName] = useState<string>('');
  return (
    <View style={styles.container}>
      <AppTextInput
        label="İsim"
        value={name}
        onChangeText={setName}
        placeholder="Kategorinin ismini yazın..."
      />
    </View>
  );
};

export default CategoryFormScreen;
