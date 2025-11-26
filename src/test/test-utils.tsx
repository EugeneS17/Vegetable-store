import { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import productsReducer from '../store/productsSlice';
import cartReducer from '../store/cartSlice';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
}

export function renderWithProviders(
  ui: ReactElement,
  options: ExtendedRenderOptions = {}
) {
  const { preloadedState, ...renderOptions } = options;
  const store = configureStore({
    reducer: {
      products: productsReducer,
      cart: cartReducer,
    },
    preloadedState: preloadedState as RootState | undefined,
  });

  function Wrapper({ children }: { children: React.ReactNode }) {
    return <Provider store={store}>{children}</Provider>;
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

// Re-export everything from testing-library/react (!)
// eslint-disable-next-line react-refresh/only-export-components
export * from '@testing-library/react';

