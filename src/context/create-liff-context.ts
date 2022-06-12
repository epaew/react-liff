import { Liff } from '@line/liff';
import { createContext, useContext } from 'react';

import { createLiffProvider } from './create-liff-provider';
import { CreateLiffContext, LiffContextStates } from './types';

export const createLiffContext: CreateLiffContext = () => {
  const context = createContext<LiffContextStates>({
    isLoggedIn: false,
    liff: {} as Liff,
    ready: false,
  });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};
