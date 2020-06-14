import { Liff } from './types';

// login status
let loggedIn = false;

const bluetooth = {
  getAvailability: async () => false,
  requestDevice: async () => ({
    id: 'id',
    watchingAdvertisements: false,
    watchAdvertisements: async () => {},
    unwatchAdvertisements: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
};
const permanentLink = {
  createUrl: () => 'https://liff.line.me/liffId/path',
  setExtraQueryParams: () => {},
};

export const liffStub: Liff = {
  id: 'liffId',
  init: async () => {},
  ready: new Promise(() => {}),
  getOS: () => 'web',
  getLanguage: () => 'ja',
  getVersion: () => '2.1.3',
  getLineVersion: () => '10.8.0',
  isInClient: () => true,
  isLoggedIn: () => loggedIn,
  isApiAvailable: () => true,
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
    viewType: 'full',
    userId: 'userId',
    availability: {
      shareTargetPicker: {
        permission: false,
        minVer: '10.8.0',
      },
    },
  }),
  getProfile: async () => ({
    displayName: 'displayName',
    pictureUrl: 'https://example.com/test.jpg',
    statusMessage: '',
    userId: 'userId',
  }),
  getFriendship: async () => {
    return { friendFlag: true };
  },
  permanentLink,
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
  bluetooth,
};
