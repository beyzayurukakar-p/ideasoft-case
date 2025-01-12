import Toast from 'react-native-toast-message';
import { GENERIC_ERROR_MESSAGE } from './constants';

/** This function is used to call an async function and handle the error */
export const tryCalling = async <Args extends Array<any>, ReturnValue>(
  fn: (...args: Args) => Promise<ReturnValue>,
  ...args: Args
) => {
  // This is a tuple that will hold the return value and error message
  const returnVal: [ReturnValue | undefined, string | undefined] = [undefined, undefined];

  try {
    const data = await fn(...args);
    returnVal[0] = data;
  } catch (error) {
    Toast.show({
      type: 'error',
      text1: GENERIC_ERROR_MESSAGE,
    });
    returnVal[1] = GENERIC_ERROR_MESSAGE;
  }

  return returnVal;
};
