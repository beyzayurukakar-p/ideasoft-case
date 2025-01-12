export type ServiceCallbacks<Data> = {
  onSuccess?: (data: Data) => void;
  onError?: () => void;
};
