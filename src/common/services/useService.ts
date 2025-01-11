import { useCallback, useState } from 'react';
import Toast from 'react-native-toast-message';

/** Gives the type returned by an async function */
type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
  ...args: any
) => Promise<infer R>
  ? R
  : any;

export type RequesterFunction = (args?: any) => Promise<any>;

type Options<Data> = {
  /** Called with returned value from requesterFunction */
  onSuccess?: (data: Data) => void;
  /** Called with thrown error from requesterFunction */
  onError?: (error: string) => void;
  /** Called in finally block */
  onComplete?: () => void;
};

/**
 * Hook to make sending requests easier in a component.
 * Includes loading status. Shows error.
 */
export const useService = <RF extends RequesterFunction>(requesterFunc: RF) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<AsyncReturnType<RF> | null>(null);

  const request = useCallback(
    (args: Parameters<RF>[0], options?: Options<AsyncReturnType<RF>>) => {
      setLoading(true);
      requesterFunc(args)
        .then((returnedData: AsyncReturnType<RF>) => {
          // Update state
          setData(returnedData);
          // Call event handler callback
          options?.onSuccess?.(returnedData);
        })
        .catch((err: string) => {
          // Show error
          Toast.show({
            type: 'error',
            text1: err,
          });

          // Call event handler callback
          options?.onError?.(err);
        })
        .finally(() => {
          setLoading(false);
          options?.onComplete?.();
        });
    },
    [requesterFunc]
  );

  return {
    loading,
    data,
    request,
  };
};
