import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState, StartAppListening } from './types';
import { listenerMiddleware } from './listenerMiddleware';

export { store } from './configuration';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const startAppListening = listenerMiddleware.startListening as StartAppListening;
