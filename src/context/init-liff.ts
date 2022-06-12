import { Liff } from '@line/liff';

import { liffStub as stub } from '../liff-stub';

import { InitLiff } from './types';

// eslint-disable-next-line filenames-simple/typescript-module-declaration
declare global {
  interface Window {
    liff?: Liff;
  }
}

export const initLiff: InitLiff = async ({ stubEnabled, ...liffConfig }) => {
  if (stubEnabled) {
    if (typeof stubEnabled === 'object') {
      return { liff: { ...stub, ...stubEnabled }, ready: true };
    }
    return { liff: stub, ready: true };
  }

  try {
    const liff = window.liff ?? (await import('@line/liff')).default;
    await liff.init(liffConfig);
    return { liff, ready: true };
  } catch (error: unknown) {
    return { error, ready: false };
  }
};
