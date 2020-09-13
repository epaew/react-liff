import { LiffCore } from '@line/liff/dist/lib/liff';

let loginState = false;

type IdWritableLiff = Omit<LiffCore, 'id'> & { id: string | null };

const liffMock: Partial<IdWritableLiff> = {
  isLoggedIn: jest.fn().mockImplementation(() => loginState),
  login: jest.fn().mockImplementation(() => {
    loginState = true;
  }),
  logout: jest.fn().mockImplementation(() => {
    loginState = false;
  }),
  id: null,
  init: jest.fn().mockImplementation(async ({ liffId }: { liffId: string }) => {
    liffMock.id = liffId;
  }),
};

export { liffMock as liff };
