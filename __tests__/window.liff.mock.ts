let loggedIn = false;

Object.defineProperty(window, 'liff', {
  writable: true,
  value: {
    id: null,
    init: jest.fn().mockImplementation(async (options: { liffId: string }) => {
      window.liff.id = options.liffId;
    }),
    isLoggedIn: jest.fn().mockImplementation(() => loggedIn),
    login: jest.fn().mockImplementation(() => {
      loggedIn = true;
    }),
    logout: jest.fn().mockImplementation(() => {
      loggedIn = false;
    }),
  },
});
