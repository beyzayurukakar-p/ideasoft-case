import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList } from 'react-native';
import { dropdownStyles as styles } from './Dropdown.styles';
import Entypo from '@expo/vector-icons/Entypo';
import { dimensions } from '../../styling/dimensions';
import { COLORS } from '../../styling/colors';
import Label from './Label';
import ErrorText from './ErrorText';

type Option = { label: string; value: string };
type DropdownProps = {
  label: string;
  options: Array<Option>;
  selectedValue?: string;
  onValueChange: (value: string) => void;
  errorText?: string | null;
  placeholder?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  label,
  options,
  selectedValue,
  onValueChange,
  errorText,
  placeholder,
}) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const _onSelect = useCallback(
    (value: string) => {
      onValueChange(value);
      setIsVisible(false);
    },
    [onValueChange]
  );

  const _onPressBackdrop = () => {
    setIsVisible(false);
  };

  const _renderOptionItem = useCallback(
    ({ item }: { item: Option }) => (
      <TouchableOpacity
        style={styles.option}
        onPress={() => _onSelect(item.value)}
      >
        {item.value === selectedValue ? (
          <View style={styles.checkIconContainer}>
            <Entypo
              name="check"
              size={dimensions.measure(20)}
              color={COLORS.successTextOnBackground}
            />
          </View>
        ) : null}
        <Text style={styles.optionText}>{item.label}</Text>
      </TouchableOpacity>
    ),
    [_onSelect, selectedValue]
  );

  const _renderSelectionModal = () => {
    return (
      <Modal
        visible={isVisible}
        transparent={true}
        animationType="none"
        onRequestClose={() => setIsVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={_onPressBackdrop}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value.toString()}
              ItemSeparatorComponent={ItemSeparator}
              showsVerticalScrollIndicator={false}
              renderItem={_renderOptionItem}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <View style={styles.container}>
      <Label>{label}</Label>
      <TouchableOpacity
        style={[styles.input, errorText ? styles.inputWithError : null]}
        onPress={() => setIsVisible(true)}
      >
        <Text style={styles.inputText}>
          {options.find((option) => option.value === selectedValue)?.label || placeholder}
        </Text>
      </TouchableOpacity>
      {errorText ? <ErrorText>{errorText}</ErrorText> : null}
      {_renderSelectionModal()}
    </View>
  );
};

const ItemSeparator = () => {
  return <View style={styles.separator} />;
};

export default Dropdown;
