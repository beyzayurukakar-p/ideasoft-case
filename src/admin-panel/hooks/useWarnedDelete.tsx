import { useCallback, useRef, useState } from 'react';
import DeleteWarningModal from '../components/delete-warning-modal/DeleteWarningModal';

export const useWarnedDelete = (onDelete?: () => void) => {
  const [isVisible, setIsVisible] = useState(false);
  const onDeleteRef = useRef<(...args: any) => void>();

  const _warnBeforeDelete = useCallback((_onDelete?: () => void) => {
    if (_onDelete) {
      onDeleteRef.current = _onDelete;
    }
    // Show modal
    setIsVisible(true);
  }, []);

  const _onPressSureToDelete = () => {
    setIsVisible(false);
    if (typeof onDeleteRef.current === 'function') {
      onDeleteRef.current();
    } else {
      onDelete?.();
    }
  };

  const _onPressClose = () => {
    setIsVisible(false);
  };

  const _renderWarningModal = () => {
    return (
      <DeleteWarningModal
        visible={isVisible}
        onClose={_onPressClose}
        onDelete={_onPressSureToDelete}
      />
    );
  };

  return {
    warnBeforeDelete: _warnBeforeDelete,
    renderWarningModal: _renderWarningModal,
  };
};
