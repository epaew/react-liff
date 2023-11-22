import { Liff } from "@line/liff";
import * as PropTypes from "prop-types";
import { FC, createElement, useEffect, useState } from "react";

import { useLoginStateManager } from "../hooks/index.js";
import { getInitializedLiff } from "../lib/index.js";

import { CreateLiffProvider, LiffProviderProps } from "./types.js";

const LiffProviderPropTypes = {
  children: PropTypes.element.isRequired,
  liffId: PropTypes.string.isRequired,
  withLoginOnExternalBrowser: PropTypes.bool,
  plugins: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])),
  callback: PropTypes.func,
};

export const createLiffProvider: CreateLiffProvider = (context) => {
  const LiffProvider: FC<LiffProviderProps> = ({ children, ...rest }) => {
    const [error, setError] = useState<unknown>();
    const [isReady, setIsReady] = useState(false);

    const [originalLiff, setLiff] = useState<Liff>();
    const [isLoggedIn, liff] = useLoginStateManager(originalLiff);

    useEffect(() => {
      (async () => {
        try {
          setLiff(await getInitializedLiff(rest));
          setIsReady(true);
        } catch (e: unknown) {
          setError(e);
        }
      })();
    }, [rest]);

    return createElement(context.Provider, { value: { error, isLoggedIn, isReady, liff } }, children);
  };

  // @ts-ignore
  LiffProvider.propTypes = LiffProviderPropTypes;
  return LiffProvider;
};
