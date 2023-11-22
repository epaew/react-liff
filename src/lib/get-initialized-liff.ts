import { Liff, LiffPlugin } from "@line/liff";

declare global {
  interface Window {
    liff?: Liff;
  }
}

type LiffConfig = Parameters<Liff["init"]>[0];

// biome-ignore lint/suspicious/noExplicitAny:
type Plugin<PluginOption = any> = LiffPlugin<any, void> | [LiffPlugin<any, PluginOption>, PluginOption];

interface GetInitializedLiffProps extends LiffConfig {
  plugins?: Plugin[];
  callback?: (liff: Liff) => Promise<void>;
}

type GetInitializedLiff = (props: GetInitializedLiffProps) => Promise<Liff>;

const getLiff = async (): Promise<Liff> => {
  // @ts-ignore: This is an issue of @line/liff
  return window.liff ?? ((await import("@line/liff")).default as Liff);
};

const registerLiffPlugin = (liff: Liff, plugin: Plugin) => {
  Array.isArray(plugin) ? liff.use(...plugin) : liff.use(plugin);
};

const getInitializedLiff: GetInitializedLiff = async ({ plugins = [], callback = () => {}, ...liffConfig }) => {
  const liff = await getLiff();

  for (const plugin of plugins) {
    registerLiffPlugin(liff, plugin);
  }
  await liff.init(liffConfig);
  await callback(liff);

  return liff;
};

export type { GetInitializedLiff, GetInitializedLiffProps };
export { getInitializedLiff };
