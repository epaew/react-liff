import { default as liff } from '@line/liff';

type Liff = typeof liff;
type Loginable = Pick<Liff, 'isLoggedIn' | 'login' | 'logout'>;

export { Liff, Loginable };
