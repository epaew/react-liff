import * as PropTypes from 'prop-types';
import { Consumer, Context, createContext, FC, ReactNode, useContext, useEffect, useState } from 'react';

import { useLoginStateManager } from './hooks';
import { liffStub as stub } from './liff-stub';
import { Liff, LiffConfig } from './types';

interface InitLiffProps extends LiffConfig {
  stubEnabled?: boolean | Partial<Liff>;
}
interface LiffProviderProps extends InitLiffProps {
  children: ReactNode;
}
interface LiffContextStates {
  error?: unknown;
  isLoggedIn: boolean;
  liff: Liff;
  ready: boolean;
}
interface CreateLiffContext {
  (): {
    LiffConsumer: Consumer<LiffContextStates>;
    LiffProvider: FC<LiffProviderProps>;
    useLiff: () => LiffContextStates;
  };
}

const initLiff = async ({ stubEnabled, ...liffConfig }: InitLiffProps) => {
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

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  stubEnabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  withLoginOnExternalBrowser: PropTypes.bool,
};

const createLiffProvider = (context: Context<LiffContextStates>) => {
  const LiffProvider: FC<LiffProviderProps> = ({ children, stubEnabled = false, ...liffConfig }) => {
    const [error, setError] = useState<unknown>();
    const [originalLiff, setLiff] = useState<Liff>(stub);
    const [ready, setReady] = useState(false);
    const [isLoggedIn, liff] = useLoginStateManager(originalLiff);

    useEffect(() => {
      (async () => {
        const { error, liff, ready } = await initLiff({ stubEnabled, ...liffConfig });
        setError(error);
        setLiff(liff as Liff);
        setReady(ready);
      })();
    }, [stubEnabled, liffConfig]);

    return <context.Provider value={{ error, liff, isLoggedIn, ready }}>{children}</context.Provider>;
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};

export const createLiffContext: CreateLiffContext = () => {
  const context = createContext<LiffContextStates>({
    isLoggedIn: false,
    liff: stub,
    ready: false,
  });
  context.displayName = 'LiffContext';

  return {
    LiffConsumer: context.Consumer,
    LiffProvider: createLiffProvider(context),
    useLiff: () => useContext(context),
  };
};

export const { LiffConsumer, LiffProvider, useLiff } = createLiffContext();
