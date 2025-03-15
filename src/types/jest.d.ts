import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(content: string | RegExp): R;
      toBeVisible(): R;
      toHaveValue(value: string | number | RegExp): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeChecked(): R;
      toBeRequired(): R;
    }
  }
}
