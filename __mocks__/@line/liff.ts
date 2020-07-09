import { LiffCore } from '@line/liff/dist/lib/liff';

let loggedIn = false;

type IdWritableLiff = Omit<LiffCore, 'id'> & { id: string | null };

const liffMock: Partial<IdWritableLiff> = {
  isLoggedIn: jest.fn().mockImplementation(() => loggedIn),
  login: jest.fn().mockImplementation(() => {
    loggedIn = true;
  }),
  logout: jest.fn().mockImplementation(() => {
    loggedIn = false;
  }),
  id: null,
  init: jest.fn().mockImplementation(async ({ liffId }: { liffId: string }) => {
    liffMock.id = liffId;
  }),
};

export { liffMock as liff };
