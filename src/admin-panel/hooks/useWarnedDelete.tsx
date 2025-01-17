import { useCallback, useRef, useState } from 'react';
import DeleteWarningModal from '../components/delete-warning-modal/DeleteWarningModal';

/** Optional callback function to be executed when the delete action is confirmed. */
type OnDeleteCallback = () => void;

type WarnedDeleteHookReturnType = {
  /**
   * Function to trigger the warning modal.
   * Accepts an optional callback function to be executed when the delete action is confirmed.
   */
  warnBeforeDelete: (onDelete?: OnDeleteCallback) => void;

  /** Function to render the delete warning modal component. */
  renderWarningModal: () => React.JSX.Element;
};

/**
 * Custom hook to manage the state and actions for displaying a delete warning modal.
 */
export const useWarnedDelete = (onDelete?: OnDeleteCallback): WarnedDeleteHookReturnType => {
  const [isVisible, setIsVisible] = useState(false);
  const onDeleteRef = useRef<(...args: any) => void>();

  const _warnBeforeDelete = useCallback((_onDelete?: () => void) => {
    // Save the callback to ref to call it when actual delete button is pressed.
    if (_onDelete) {
      onDeleteRef.current = _onDelete;
    }
    // Show modal
    setIsVisible(true);
  }, []);

  // Called when user presses final delete button
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
        onCancel={_onPressClose}
        onDelete={_onPressSureToDelete}
      />
    );
  };

  return {
    warnBeforeDelete: _warnBeforeDelete,
    renderWarningModal: _renderWarningModal,
  };
};
