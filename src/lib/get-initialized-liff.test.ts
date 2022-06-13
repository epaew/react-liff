import { default as liff, LiffPlugin } from '@line/liff';

import { getInitializedLiff } from './get-initialized-liff';

jest.mock('@line/liff');

class DummyLiffPlugin implements LiffPlugin<Record<string, never>> {
  readonly name: string;

  constructor() {
    this.name = 'dummy';
  }

  install() {
    return {};
  }
}

describe('getInitializedLiff', () => {
  const subject = getInitializedLiff;

  const liffId = 'liffId';
  const withLoginOnExternalBrowser = false;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('When no plugin/callback was given', () => {
    it('returns liff object/liff.init was 1 time called with', async () => {
      const result = await subject({ liffId, withLoginOnExternalBrowser });

      expect(result).toBe(liff);
      expect(liff.init).toHaveBeenNthCalledWith(1, { liffId, withLoginOnExternalBrowser });
    });
  });

  describe('When one plugin with no option was given', () => {
    const plugin = new DummyLiffPlugin();

    it('calls liff.use() 1 time with', async () => {
      const result = await subject({ liffId, withLoginOnExternalBrowser, plugins: [plugin] });

      expect(result).toBe(liff);
      expect(liff.init).toHaveBeenNthCalledWith(1, { liffId, withLoginOnExternalBrowser });
      expect(liff.use).toHaveBeenNthCalledWith(1, plugin);
    });
  });

  describe('When one plugin with option was given', () => {
    const plugin = new DummyLiffPlugin();
    const pluginOption = {};

    it('calls liff.use() 1 time with', async () => {
      const result = await subject({ liffId, withLoginOnExternalBrowser, plugins: [[plugin, pluginOption]] });

      expect(result).toBe(liff);
      expect(liff.init).toHaveBeenNthCalledWith(1, { liffId, withLoginOnExternalBrowser });
      expect(liff.use).toHaveBeenNthCalledWith(1, plugin, pluginOption);
    });
  });

  describe('When callback was given', () => {
    const callback = jest.fn();

    it('calls callback() 1 time with', async () => {
      const result = await subject({ liffId, withLoginOnExternalBrowser, callback });

      expect(result).toBe(liff);
      expect(liff.init).toHaveBeenNthCalledWith(1, { liffId, withLoginOnExternalBrowser });
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });

  describe('When one plugin with no option/callback was given', () => {
    const plugin = new DummyLiffPlugin();
    const callback = jest.fn();

    it('calls liff.use() 1 time with/calls callback() 1 time with', async () => {
      const result = await subject({ liffId, withLoginOnExternalBrowser, plugins: [plugin], callback });

      expect(result).toBe(liff);
      expect(liff.init).toHaveBeenNthCalledWith(1, { liffId, withLoginOnExternalBrowser });
      expect(liff.use).toHaveBeenNthCalledWith(1, plugin);
      expect(callback).toHaveBeenCalledTimes(1);
    });
  });
});
