import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { liffStub as stub } from './liff-stub';
import { Liff, LiffBase, LiffError } from './types';
import { useLoginStateManager } from './use-login-state-manager';

interface LiffProviderProps<T> {
  liffId: string;
  stubEnabled?: boolean | Partial<T>;
}
interface LiffContext<T> {
  error?: LiffError;
  liff: T;
  loggedIn: boolean;
  ready: boolean;
}
type CreateLiffContext = <T extends LiffBase>() => {
  LiffConsumer: React.Consumer<LiffContext<T>>;
  LiffProvider: React.FC<LiffProviderProps<T>>;
  useLiff: () => LiffContext<T>;
};

const initLiff = async <T extends LiffBase>({ liffId, stubEnabled }: LiffProviderProps<T>) => {
  if (stubEnabled) {
    if (typeof stubEnabled === 'object') {
      return { liff: { ...stub, ...stubEnabled }, ready: true };
    }
    return { liff: stub, ready: true };
  }

  try {
    await window.liff.init({ liffId });
    return { liff: window.liff, ready: true };
  } catch (error) {
    return { error, ready: false };
  }
};

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  stubEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const createLiffProvider = <T extends LiffBase>(context: React.Context<LiffContext<T>>) => {
  const LiffProvider: React.FC<LiffProviderProps<T>> = ({
    children,
    liffId,
    stubEnabled = false,
  }) => {
    const [error, setError] = useState<LiffError>();
    const [originalLiff, setLiff] = useState<T>(stub as any);
    const [ready, setReady] = useState(false);
    const [loggedIn, liff] = useLoginStateManager<T>(originalLiff);

    useEffect(() => {
      (async () => {
        const { error, liff, ready } = await initLiff({ liffId, stubEnabled });
        setError(error);
        setLiff(liff as any);
        setReady(ready);
      })();
    }, [liffId, stubEnabled]);

    return <context.Provider value={{ error, liff, loggedIn, ready }}>{children}</context.Provider>;
  };

  /* @ts-ignore */
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};

export const createLiffContext: CreateLiffContext = <T extends LiffBase>() => {
  const context = createContext<LiffContext<T>>({
    liff: stub as any,
    loggedIn: false,
    ready: false,
  });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => React.useContext(context),
  };
};

const { LiffConsumer, LiffProvider, useLiff } = createLiffContext<Liff>();
export { LiffConsumer, LiffProvider, useLiff };
