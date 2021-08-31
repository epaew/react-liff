import type { LiffModules } from '@line/liff/dist/lib/core';
import type { LiffCore } from '@line/liff/dist/lib/liff';

type Liff = LiffCore & LiffModules;
type Loginable = Pick<Liff, 'isLoggedIn' | 'login' | 'logout'>;

export { Liff, LiffCore, Loginable };
