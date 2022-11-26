import { Liff } from '@line/liff';
import { createContext, useContext } from 'react';

import { createLiffProvider } from './create-liff-provider.js';
import { CreateLiffContext, LiffContextStates } from './types.js';

export const createLiffContext: CreateLiffContext = () => {
  const context = createContext<LiffContextStates>({
    isLoggedIn: false,
    isReady: false,
    liff: {} as Liff,
  });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};
