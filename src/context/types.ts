import type { Liff } from '@line/liff';
import type { Consumer, Context, FC, ReactNode } from 'react';

import type { GetInitializedLiffProps } from '../lib';

export interface CreateLiffContext {
  (): {
    LiffConsumer: Consumer<LiffContextStates>;
    LiffProvider: FC<LiffProviderProps>;
    useLiff: () => LiffContextStates;
  };
}

export interface CreateLiffProvider {
  (context: Context<LiffContextStates>): FC<LiffProviderProps>;
}

export interface LiffContextStates {
  error?: unknown;
  isLoggedIn: boolean;
  isReady: boolean;
  liff: Liff;
}

export interface LiffProviderProps extends GetInitializedLiffProps {
  children: ReactNode;
}
