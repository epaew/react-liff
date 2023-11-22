import { Liff } from '@line/liff';

type IdWritableLiff = Omit<Liff, 'id'> & { id: string | null };

let loginState = false;

const liffMock: Partial<IdWritableLiff> = {
  id: null,
  init: jest.fn().mockImplementation(async ({ liffId }: { liffId: string }) => {
    liffMock.id = liffId;
  }),
  isLoggedIn: jest.fn().mockImplementation(() => loginState),
  login: jest.fn().mockImplementation(() => {
    loginState = true;
  }),
  logout: jest.fn().mockImplementation(() => {
    loginState = false;
  }),
  use: jest.fn(),
};

export default liffMock;
