import { Liff } from '@line/liff';
import * as PropTypes from 'prop-types';
import { createElement, FC, useEffect, useState } from 'react';

import { useLoginStateManager } from '../hooks';

import { initLiff } from './init-liff';
import { CreateLiffProvider, LiffProviderProps } from './types';

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  withLoginOnExternalBrowser: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
  callback: PropTypes.func,
};

export const createLiffProvider: CreateLiffProvider = context => {
  const LiffProvider: FC<LiffProviderProps> = ({ children, stubEnabled = false, ...liffConfig }) => {
    const [error, setError] = useState<unknown>();
    const [originalLiff, setLiff] = useState<Liff>();
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

    return createElement(context.Provider, { value: { error, liff, isLoggedIn, ready } }, children);
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};
