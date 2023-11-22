import { default as liff } from "@line/liff";
import { act, renderHook } from "@testing-library/react";

import { useLoginStateManager } from "./use-login-state-manager";

jest.mock("@line/liff");

describe("useLoginStateManager", () => {
  describe("When liff is undefined", () => {
    const render = () => renderHook(() => useLoginStateManager(undefined));

    describe("After the hook is initialized", () => {
      it("return false as initial login state", () => {
        const { result } = render();

        expect(result.current[0]).toBe(false);
      });
    });

    describe("After `login()` was called", () => {
      it("return false as login state", () => {
        const { result } = render();

        act(() => {
          result.current[1].login();
        });

        expect(result.current[0]).toBe(false);
      });
    });

    describe("After `logout()` was called", () => {
      it("return true as login state", () => {
        const { result } = render();

        act(() => {
          result.current[1].logout();
        });

        expect(result.current[0]).toBe(false);
      });
    });
  });

  describe("When liff is defined", () => {
    const render = () => renderHook(() => useLoginStateManager(liff));

    describe("After the hook is initialized", () => {
      it("return false as initial login state", () => {
        const { result } = render();

        expect(result.current[0]).toBe(false);
      });
    });

    describe("After `login()` was called", () => {
      it("return true as login state", () => {
        const { result } = render();

        act(() => {
          result.current[1].login();
        });

        expect(result.current[0]).toBe(true);
      });
    });

    describe("After `logout()` was called", () => {
      it("return true as login state", () => {
        const { result } = render();

        act(() => {
          result.current[1].logout();
        });

        expect(result.current[0]).toBe(false);
      });
    });
  });
});
