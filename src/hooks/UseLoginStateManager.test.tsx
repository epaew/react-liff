import { default as liffMock } from '@line/liff';
import { fireEvent, render, waitFor } from '@testing-library/react';
import { FC } from 'react';

import { useLoginStateManager } from './use-login-state-manager';

jest.mock('@line/liff');

const TestComponent: FC<{ liff?: any }> = ({ liff }) => {
  const [isLoggedIn, customLiff] = useLoginStateManager(liff);

  return (
    <>
      <p data-testid="logged-in">{isLoggedIn.toString()}</p>
      <button data-testid="login" onClick={() => customLiff.login()}>
        login
      </button>
      <button data-testid="logout" onClick={() => customLiff.logout()}>
        logout
      </button>
    </>
  );
};

describe('useLoginStateManager', () => {
  const subject = (liff?: any) => render(<TestComponent liff={liff} />);

  describe('When liff is undefined', () => {
    it('returns false as initial login status', async () => {
      const { getByTestId } = subject();

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
      });
    });

    it('returns false as login status after login', async () => {
      const { getByTestId } = subject();
      fireEvent.click(getByTestId('login'));

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
      });
    });

    it('returns false as login status after logout', async () => {
      const { getByTestId } = subject();
      fireEvent.click(getByTestId('logout'));

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
      });
    });
  });

  describe('When liff is defined', () => {
    it('returns false as initial login status', async () => {
      const { getByTestId } = subject(liffMock);

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
        expect(liffMock.isLoggedIn).toHaveBeenCalled();
      });
    });

    it('returns true as login status after login', async () => {
      const { getByTestId } = subject(liffMock);
      fireEvent.click(getByTestId('login'));

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('true');
        expect(liffMock.login).toHaveBeenCalled();
      });
    });

    it('returns false as login status after logout', async () => {
      const { getByTestId } = subject(liffMock);
      fireEvent.click(getByTestId('logout'));

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
        expect(liffMock.logout).toHaveBeenCalled();
      });
    });
  });
});
