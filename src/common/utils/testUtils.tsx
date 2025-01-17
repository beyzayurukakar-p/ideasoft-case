import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { render, RenderOptions } from '@testing-library/react-native';
import { store } from '../store';

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
