Object.defineProperty(window, 'liff', {
  writable: true,
  value: {
    init: jest.fn().mockImplementation(async (options: { liffId: string }) => {
      /* @ts-ignore */
      window.liff.id = options.liffId;
    }),
  },
});
