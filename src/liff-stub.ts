import { Liff } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type LiffStub = Liff & { [key in Exclude<string, keyof Liff>]: any };

// login status
let loggedIn = false;

const permanentLink: Liff['permanentLink'] = {
  createUrl: () => 'https://liff.line.me/liffId/path',
  setExtraQueryParam: () => {},
};

export const liffStub: LiffStub = {
  init: async () => {},
  getOS: () => 'web',
  getVersion: () => '2.1.3',
  getLanguage: () => 'ja',
  isInClient: () => true,
  isLoggedIn: () => loggedIn,
  login: () => {
    loggedIn = true;
  },
  logout: () => {
    loggedIn = false;
  },
  getAccessToken: () => 'DummyAccessToken',
  getIDToken: () => 'DummyIDToken',
  getDecodedIDToken: () => ({
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
  getContext: () => ({
    type: 'none',
    groupId: 'groupId',
    userId: 'userId',
    endpointUrl: 'endpointUrl',
    viewType: 'full',
    availability: {
      shareTargetPicker: {
        permission: false,
        minVer: '10.8.0',
      },
    },
  }),
  openWindow: ({ url, external }) => {
    external ? window.open(url) : (window.location.href = url);
  },
  closeWindow: () => {
    window.close();
  },
  getFeatures: () => [],
  getFriendship: async () => {
    return { friendFlag: true };
  },
  checkFeature: () => true,
  getAId: () => undefined,
  getProfilePlus: () => undefined,
  getIsVideoAutoPlay: () => true,
  getLineVersion: () => '10.8.0',
  isApiAvailable: () => true,
  getProfile: async () => ({
    displayName: 'displayName',
    pictureUrl: 'https://example.com/test.jpg',
    statusMessage: '',
    userId: 'userId',
  }),
  sendMessages: async () => {},
  userPicker: async () => null,
  shareTargetPicker: async () => {},
  permanentLink,
  ready: new Promise(() => {}),
  id: 'liffId',
  _dispatchEvent: () => {},
  _call: async () => {},
  _addListener: () => {},
  _removeListener: () => {},
  _postMessage: () => {},

  // Extras
  addToHomeScreen: async () => 0,
  scanCode: async () => ({ value: 'DummyCode' }),
  getAdvertisingId: async () => null,
  initPlugins: async () => [],
};
