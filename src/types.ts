import { LiffExtendableFunctions } from '@line/liff/dist/lib/init/definition/LiffExtension';
import { LiffCore } from '@line/liff/dist/lib/liff';
import LiffError from '@line/liff/dist/lib/util/LiffError';

type Liff = LiffCore & LiffExtendableFunctions;
type Loginable = Pick<LiffCore, 'isLoggedIn' | 'login' | 'logout'>;

export { Liff, LiffCore, LiffError, Loginable };
