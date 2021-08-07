import type { LiffModules } from '@line/liff/dist/lib/core';
import type { LiffCore } from '@line/liff/dist/lib/liff';
import type LiffError from '@line/liff/dist/lib/util/LiffError';

type Liff = LiffCore & LiffModules;
type Loginable = Pick<Liff, 'isLoggedIn' | 'login' | 'logout'>;

export { Liff, LiffCore, LiffError, Loginable };
