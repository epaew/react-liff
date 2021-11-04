import * as PropTypes from 'prop-types';
import { Consumer, Context, createContext, FC, useContext, useEffect, useState } from 'react';

import { liffStub as stub } from './liff-stub';
import { LiffCore, Loginable } from './types';
import { useLoginStateManager } from './use-login-state-manager';

interface LiffProviderProps<T> {
  liffId: string;
  stubEnabled?: boolean | Partial<T>;
}
interface LiffContext<T> {
  error?: unknown;
  isLoggedIn: boolean;
  liff: T;
  ready: boolean;
}
type CreateLiffContext = <T extends LoginableLiffCore>() => {
  LiffConsumer: Consumer<LiffContext<T>>;
  LiffProvider: FC<LiffProviderProps<T>>;
  useLiff: () => LiffContext<T>;
};
type LoginableLiffCore = LiffCore & Loginable;

const initLiff = async <T extends LoginableLiffCore>({
  liffId,
  stubEnabled,
}: LiffProviderProps<T>) => {
  if (stubEnabled) {
    if (typeof stubEnabled === 'object') {
      return { liff: { ...stub, ...stubEnabled }, ready: true };
    }
    return { liff: stub, ready: true };
  }

  try {
    const liff = window.liff ?? (await import('@line/liff')).default;
    await liff.init({ liffId });
    return { liff, ready: true };
  } catch (error: unknown) {
    return { error, ready: false };
  }
};

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  stubEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const createLiffProvider = <T extends LoginableLiffCore>(context: Context<LiffContext<T>>) => {
  const LiffProvider: FC<LiffProviderProps<T>> = ({ children, liffId, stubEnabled = false }) => {
    const [error, setError] = useState<unknown>();
    const [originalLiff, setLiff] = useState<T>(stub as T);
    const [ready, setReady] = useState(false);
    const [isLoggedIn, liff] = useLoginStateManager<T>(originalLiff);

    useEffect(() => {
      (async () => {
        const { error, liff, ready } = await initLiff({ liffId, stubEnabled });
        setError(error);
        setLiff(liff as T);
        setReady(ready);
      })();
    }, [liffId, stubEnabled]);

    return (
      <context.Provider value={{ error, liff, isLoggedIn, ready }}>{children}</context.Provider>
    );
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};

export const createLiffContext: CreateLiffContext = <T extends LoginableLiffCore>() => {
  const context = createContext<LiffContext<T>>({
    isLoggedIn: false,
    liff: stub as T,
    ready: false,
  });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};

export const { LiffConsumer, LiffProvider, useLiff } = createLiffContext<LoginableLiffCore>();
