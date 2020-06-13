import { Liff } from './types';

declare global {
  interface Window {
    liff: Liff;
  }
}

export * from './context';
export * as Types from './types';
