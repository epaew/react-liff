import { default as liff } from '@line/liff';

type Liff = typeof liff;
type LiffConfig = Parameters<Liff['init']>[0];

export { Liff, LiffConfig };
