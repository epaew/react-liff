import { default as liff } from '@line/liff';

type Liff = typeof liff;
type IdWritableLiff = Omit<Liff, 'id'> & { id: string | null };

let loginState = false;

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

// eslint-disable-next-line import/no-default-export
export default liffMock;
