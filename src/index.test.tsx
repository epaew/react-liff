import { default as liff } from "@line/liff";
import { render, waitFor } from "@testing-library/react";

import { LiffProvider, useLiff } from ".";

jest.mock("@line/liff");

const TestComponent = () => {
  const LiffConsumer = () => {
    const { error, isReady, liff } = useLiff();

    return (
      <>
        <p data-testid="isReady">{isReady.toString()}</p>
        <p data-testid="error.message">{error instanceof Error && error.message}</p>
        <p data-testid="liff.id">{liff?.id}</p>
      </>
    );
  };

  return (
    <LiffProvider liffId={"myLiffId"}>
      <LiffConsumer />
    </LiffProvider>
  );
};

describe("LiffProvider", () => {
  describe("When the `liff.init()` succeeds", () => {
    it("shows myLiffId", async () => {
      const { getByTestId } = render(TestComponent());

      await waitFor(() => {
        expect(getByTestId("isReady").textContent).toBe("true");
        expect(getByTestId("error.message").textContent).toBe("");
        expect(getByTestId("liff.id").textContent).toBe("myLiffId");
      });
    });
  });

  describe("When the `liff.init()` failed", () => {
    beforeEach(() => {
      liff.init = jest.fn().mockImplementationOnce(async () => {
        throw new Error("Failed to initialize liff.");
      });
    });

    it("shows error message", async () => {
      const { getByTestId } = render(TestComponent());

      await waitFor(() => {
        expect(getByTestId("isReady").textContent).toBe("false");
        expect(getByTestId("error.message").textContent).toBe("Failed to initialize liff.");
      });
    });
  });
});
