import type { Consumer, Context, FC, ReactNode } from 'react';

import { Liff, LiffConfig } from '../types';

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

export interface InitLiff {
  (props: InitLiffProps): Promise<{
    error?: unknown;
    liff?: Liff;
    ready: boolean;
  }>;
}

export interface InitLiffProps extends LiffConfig {
  stubEnabled?: boolean | Partial<Liff>;
}

export interface LiffContextStates {
  error?: unknown;
  isLoggedIn: boolean;
  liff: Liff;
  ready: boolean;
}

export interface LiffProviderProps extends InitLiffProps {
  children: ReactNode;
}
