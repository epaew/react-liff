import * as React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react';

import { useLoginStateManager } from '../src/use-login-state-manager';

let loggedIn = false;
const createLiffMock = () => ({
  isLoggedIn: jest.fn().mockImplementation(() => loggedIn),
  login: jest.fn().mockImplementation(() => {
    loggedIn = true;
  }),
  logout: jest.fn().mockImplementation(() => {
    loggedIn = false;
  }),
});

// eslint-disable-next-line react/prop-types
const TestComponent: React.FC<any> = ({ liff }: { liff?: any }) => {
  const [loggedIn, customLiff] = useLoginStateManager(liff);

  return (
    <>
      <p data-testid="logged-in">{loggedIn.toString()}</p>
      <button data-testid="login" onClick={customLiff.login}>
        login
      </button>
      <button data-testid="logout" onClick={customLiff.logout}>
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
      const liffMock = createLiffMock();
      const { getByTestId } = subject(liffMock);

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
        expect(liffMock.isLoggedIn).toHaveBeenCalled();
      });
    });

    it('returns true as login status after login', async () => {
      const liffMock = createLiffMock();
      const { getByTestId } = subject(liffMock);
      fireEvent.click(getByTestId('login'));

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('true');
        expect(liffMock.login).toHaveBeenCalled();
      });
    });

    it('returns false as login status after logout', async () => {
      const liffMock = createLiffMock();
      const { getByTestId } = subject(liffMock);
      fireEvent.click(getByTestId('logout'));

      await waitFor(() => {
        expect(getByTestId('logged-in').textContent).toBe('false');
        expect(liffMock.logout).toHaveBeenCalled();
      });
    });
  });
});
