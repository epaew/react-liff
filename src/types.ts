interface BTDevice {
  id: string;
  name?: string;
  gatt?: {
    device: BTDevice;
    connected: boolean;
  };
  watchingAdvertisements: boolean;
}
interface Config {
  liffId: string;
}
interface Context {
  type: 'utou' | 'group' | 'room' | 'external' | 'none';
  viewType?: 'compact' | 'tall' | 'full';
  userId: string;
  utouId?: string;
  groupId?: string;
  roomId?: string;
  availability: {
    shareTargetPicker: {
      permission: boolean;
      minVer: string;
    };
  };
}
interface DecodedIdToken {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  amr: string[];
  name?: string;
  picture?: string;
  email?: string;
}
type Init = InitCallback & InitPromise;
type InitCallback = (
  config: Config,
  callback: () => void,
  errorCallback: (error: LiffError) => void,
) => void;
type InitPromise = (config: Config) => Promise<void>;
type Message = any; // TODO
type Messages = [Message?, Message?, Message?, Message?, Message?];
interface Profile {
  userId: string;
  displayName: string;
  pictureUrl?: string;
  statusMessage?: string;
}

/*
 * Public interfaces
 */
export interface Loginable {
  isLoggedIn: () => boolean;
  login: () => void;
  logout: () => void;
}
export type LiffBase = Loginable;

export interface Liff extends LiffBase {
  id: string | null;
  ready: Promise<void>;
  init: Init;
  getOS: () => 'ios' | 'android' | 'web';
  getLanguage: () => string;
  getVersion: () => string;
  getLineVersion: () => string | null;
  isInClient: () => boolean;
  isApiAvailable: (apiName: string) => boolean;
  getAccessToken: () => string;
  getIDToken: () => string;
  getDecodedIDToken: () => DecodedIdToken;
  getContext: () => Context;
  getProfile: () => Promise<Profile>;
  getFriendship: () => Promise<{ friendFlag: boolean }>;
  permanentLink: {
    createUrl: () => string;
    setExtraQueryParams: (extraString: string) => void;
  };
  sendMessages: (messages: Messages) => void;
  openWindow: (params: { url: string; external?: boolean }) => void;
  shareTargetPicker: (messages: Messages) => void;
  scanCode: () => Promise<{ value: string }>;
  closeWindow: () => void;
  initPlugins: (pluginNames: string[]) => Promise<void>;
  bluetooth: {
    getAvailability: () => Promise<boolean>;
    requestDevice: (options?: { filters: { deviceId: string }[] }) => Promise<BTDevice>;
  };
}

export interface LiffError {
  code: string;
  message: string;
}
