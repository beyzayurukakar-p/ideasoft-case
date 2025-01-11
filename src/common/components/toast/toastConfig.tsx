import { ErrorToast, InfoToast, SuccessToast, type ToastConfig } from 'react-native-toast-message';

export const toastConfig: ToastConfig = {
  success: (props) => (
    <SuccessToast
      {...props}
      text1Props={{ numberOfLines: 3 }}
    />
  ),
  error: (props) => (
    <ErrorToast
      {...props}
      text1Props={{ numberOfLines: 3 }}
    />
  ),
  info: (props) => (
    <InfoToast
      {...props}
      text1Props={{ numberOfLines: 3 }}
    />
  ),
};
