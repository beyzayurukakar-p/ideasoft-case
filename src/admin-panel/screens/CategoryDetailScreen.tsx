import { StaticScreenProps } from '@react-navigation/native';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type ScreenProps = StaticScreenProps<{
  categoryId: number;
}>;

const CategoryDetailScreen: React.FC<ScreenProps> = ({
  route: {
    params: { categoryId },
  },
}) => {
  return (
    <View style={styles.container}>
      <Text>{categoryId}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CategoryDetailScreen;
