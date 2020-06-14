import { Liff, Loginable } from '../src/types';

let loggedIn = false;

export const createLoginableMock = (): Loginable => ({
  isLoggedIn: jest.fn().mockImplementation(() => loggedIn),
  login: jest.fn().mockImplementation(() => {
    loggedIn = true;
  }),
  logout: jest.fn().mockImplementation(() => {
    loggedIn = false;
  }),
});

const liffMock: Partial<Liff> = {
  ...createLoginableMock(),
  id: null,
  init: jest.fn().mockImplementation(async (options: { liffId: string }) => {
    /* @ts-ignore */
    window.liff.id = options.liffId;
  }),
};

Object.defineProperty(window, 'liff', {
  writable: true,
  value: liffMock,
});
