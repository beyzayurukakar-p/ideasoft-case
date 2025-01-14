import React from 'react';
import { View, Text, Modal } from 'react-native';
import { deleteWarningModalStyles as styles } from './DeleteWarningModal.styles';
import AppButton from '../../../common/components/buttons/AppButton';
import AntDesign from '@expo/vector-icons/AntDesign';
import { dimensions } from '../../../common/styling/dimensions';
import { COLORS } from '../../../common/styling/colors';

interface DeleteWarningModalProps {
  visible: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteWarningModal: React.FC<DeleteWarningModalProps> = ({ visible, onClose, onDelete }) => {
  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.warningIconContainer}>
            <AntDesign
              name="exclamationcircleo"
              size={dimensions.measure(40)}
              color={COLORS.danger}
            />
          </View>
          <Text style={styles.warningText}>Are you sure you want to delete this item?</Text>
          <View style={styles.buttonContainer}>
            <AppButton
              label={'Vazgeç'}
              onPress={onClose}
              style={styles.cancelButton}
            />
            <AppButton
              label={'Sil'}
              onPress={onDelete}
              style={styles.deleteButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default DeleteWarningModal;
