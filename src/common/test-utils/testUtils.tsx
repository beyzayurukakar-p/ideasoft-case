import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react-native';
import { store } from '../store';
import axios from 'axios';

export function renderWithProviders(ui: React.ReactElement, renderOptions: RenderOptions = {}) {
  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  );

  // Return an object with the store and all of RTL's query functions
  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

// For tests
export const preRequest = (
  callback: (...args: any[]) => any,
  errorCallback?: (...args: any[]) => any
) => {
  axios.interceptors.request.use(
    (config) => {
      callback(config);
      return config;
    },
    (error) => {
      errorCallback?.(error);
      return error;
    }
  );
};
