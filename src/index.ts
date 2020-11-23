import { Liff } from './types';

declare global {
  interface Window {
    liff?: Liff;
  }
}

export * from './Context';
