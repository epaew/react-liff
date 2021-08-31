import { Liff } from './types';

// eslint-disable-next-line filenames-simple/typescript-module-declaration
declare global {
  interface Window {
    liff?: Liff;
  }
}

export * from './Context';
