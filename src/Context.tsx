import * as PropTypes from 'prop-types';
import { Consumer, Context, createContext, FC, useContext, useEffect, useState } from 'react';

import { liffStub as stub } from './liff-stub';
import { LiffCore, LiffError } from './types';
import { useLoginStateManager } from './use-login-state-manager';

interface LiffProviderProps<T> {
  liffId: string;
  stubEnabled?: boolean | Partial<T>;
}
interface LiffContext<T> {
  error?: LiffError;
  isLoggedIn: boolean;
  liff: T;
  /* @deprecated "loggedIn" has been renamed to "isLoggedIn", and "loggedIn" will be removed at react-liff@1.0.0. */
  loggedIn: boolean;
  ready: boolean;
}
type CreateLiffContext = <T extends LiffCore>() => {
  LiffConsumer: Consumer<LiffContext<T>>;
  LiffProvider: FC<LiffProviderProps<T>>;
  useLiff: () => LiffContext<T>;
};

const initLiff = async <T extends LiffCore>({ liffId, stubEnabled }: LiffProviderProps<T>) => {
  if (stubEnabled) {
    if (typeof stubEnabled === 'object') {
      return { liff: { ...stub, ...stubEnabled }, ready: true };
    }
    return { liff: stub, ready: true };
  }

  try {
    const liff = window.liff ?? (await import('@line/liff')).liff;
    await liff.init({ liffId });
    return { liff, ready: true };
  } catch (error) {
    return { error, ready: false };
  }
};

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  stubEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const createLiffProvider = <T extends LiffCore>(context: Context<LiffContext<T>>) => {
  const LiffProvider: FC<LiffProviderProps<T>> = ({ children, liffId, stubEnabled = false }) => {
    const [error, setError] = useState<LiffError>();
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
      <context.Provider value={{ error, liff, loggedIn: isLoggedIn, isLoggedIn, ready }}>
        {children}
      </context.Provider>
    );
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};

export const createLiffContext: CreateLiffContext = <T extends LiffCore>() => {
  const context = createContext<LiffContext<T>>({
    isLoggedIn: false,
    liff: stub as T,
    loggedIn: false,
    ready: false,
  });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};

export const { LiffConsumer, LiffProvider, useLiff } = createLiffContext<LiffCore>();
