import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { liffStub as stub } from './liff-stub';
import { Liff, LiffError } from './types';

interface initalizeLiffProviderProps<T> extends LiffProviderProps<T> {
  setError: React.Dispatch<React.SetStateAction<LiffError | undefined>>;
  setLiff: React.Dispatch<React.SetStateAction<T>>;
  setReady: React.Dispatch<React.SetStateAction<boolean>>;
}
interface LiffProviderProps<T> {
  liffId: string;
  stubEnabled?: boolean | Partial<T>;
}
interface LiffContext<T> {
  error?: LiffError;
  liff: T;
  ready: boolean;
}
type CreateLiffContext = <T>() => {
  LiffConsumer: React.Consumer<LiffContext<T>>;
  LiffProvider: React.FC<LiffProviderProps<T>>;
  useLiff: () => LiffContext<T>;
};

const initializeLiffProvider = <T extends any>({
  liffId,
  setError,
  setLiff,
  setReady,
  stubEnabled,
}: initalizeLiffProviderProps<T>) => {
  return () => {
    if (stubEnabled) {
      if (typeof stubEnabled === 'object') setLiff({ ...stub, ...stubEnabled } as T);
      setReady(true);
      return;
    }

    window.liff
      .init({ liffId })
      .then(() => {
        setLiff(window.liff as T);
        setReady(true);
      })
      .catch(e => setError(e));
  };
};

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  stubEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
};

const createLiffProvider = <T extends any>(context: React.Context<LiffContext<T>>) => {
  const LiffProvider: React.FC<LiffProviderProps<T>> = ({
    children,
    liffId,
    stubEnabled = false,
  }) => {
    const [error, setError] = useState<LiffError>();
    const [liff, setLiff] = useState<T>(stub as T);
    const [ready, setReady] = useState(false);

    useEffect(initializeLiffProvider({ liffId, setError, setLiff, setReady, stubEnabled }), [
      window.liff,
    ]);

    return <context.Provider value={{ error, liff, ready }}>{children}</context.Provider>;
  };

  /* @ts-ignore */
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};

export const createLiffContext: CreateLiffContext = <T extends any>() => {
  const context = createContext<LiffContext<T>>({ liff: stub as T, ready: false });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => React.useContext(context),
  };
};

const { LiffConsumer, LiffProvider, useLiff } = createLiffContext<Liff>();
export { LiffConsumer, LiffProvider, useLiff };
