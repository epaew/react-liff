import React, { createContext, useEffect, useState } from 'react';

export type Liff =
  | typeof window.liff
  | {
      getLineVersion: () => string;
      permanentLink: {
        createUrl: () => string;
        setExtraQueryParams: (extraString: string) => void;
      };
    };
export type LiffError = {
  code: string;
  message: string;
};
export type LiffContext = {
  liff: Liff;
  error?: LiffError;
};

const liffStub: Liff = {
  getOS: () => 'web',
  getLanguage: () => 'ja',
  getVersion: () => '2.1.3',
  getLineVersion: () => '10.8.0',
  isInClient: () => true,
  isLoggedIn: () => true,
  isApiAvailable: () => true,
  login: () => {},
  logout: () => {},
  getAccessToken: () => 'DummyAccessToken',
  getIDToken: () => 'DummyIDToken',
  getDecodedIDToken: async () => ({
    amr: [],
    aud: 'aud',
    email: 'email@example.com',
    exp: 0,
    iat: 0,
    iss: 'iss',
    name: 'name',
    picture: 'picture_url',
    sub: 'sub',
  }),
  getContext: () => ({ type: 'none', viewType: 'full' }),
  getProfile: async () => ({ userId: 'userId', displayName: 'displayName' }),
  getFriendship: async () => {
    return { friendFlag: true };
  },
  permanentLink: {
    createUrl: () => 'https://liff.line.me/liffId/path',
    setExtraQueryParams: () => {},
  },
  sendMessages: async () => {},
  openWindow: ({ url, external }) => {
    external ? window.open(url) : (window.location.href = url);
  },
  shareTargetPicker: async () => {},
  scanCode: async () => ({ value: 'DummyCode' }),
  closeWindow: () => {
    window.close();
  },
  initPlugins: async () => {},
  bluetooth: {
    getAvailability: async () => false,
    requestDevice: async () => ({
      id: 'id',
      watchingAdvertisements: false,
      watchAdvertisements: async () => {},
      unwatchAdvertisements: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
    }),
  },
};

const context = createContext<LiffContext>({ liff: liffStub });
context.displayName = 'LiffContext';

export interface LiffProviderProps {
  liffId?: string;
  stubEnabled?: boolean | Partial<Liff>;
}

export const LiffConsumer = context.Consumer;
export const LiffProvider: React.FC<LiffProviderProps> = ({
  children,
  liffId = '',
  stubEnabled = false,
}) => {
  const [liff, setLiff] = useState<Liff>(liffStub);
  const [error, setError] = useState<LiffError>();

  useEffect(() => {
    if (stubEnabled) {
      if (typeof stubEnabled === 'object') {
        setLiff({ ...liffStub, ...stubEnabled });
      }
      return;
    }

    window.liff
      .init({ liffId })
      .then(() => {
        setLiff(window.liff);
      })
      .catch(e => setError(e));
  }, [window.liff]);

  return <context.Provider value={{ liff, error }}>{children}</context.Provider>;
};

export const useLiff = (): LiffContext => React.useContext(context);
