import './window.liff.mock';

import * as React from 'react';
import { render, waitFor } from '@testing-library/react';

import { LiffProvider, Types, useLiff } from '../src/index';

const TestComponent: React.FC = () => {
  const { error, liff, ready } = useLiff();

  return (
    <>
      <p data-testid="ready">{ready.toString()}</p>
      <p data-testid="error.message">{error?.message ?? ''}</p>
      {/* @ts-ignore */}
      <p data-testid="liff.id">{liff?.id}</p>
    </>
  );
};

describe('LiffProvider', () => {
  const tree = (stubEnabled?: boolean | Partial<Types.Liff>) => (
    <LiffProvider liffId={'myLiffId'} stubEnabled={stubEnabled}>
      <TestComponent />
    </LiffProvider>
  );

  describe('When stub is disabled', () => {
    describe('When the `window.liff.init()` succeeds', () => {
      it('shows myLiffId', async () => {
        const { getByTestId } = render(tree());

        await waitFor(() => {
          expect(getByTestId('ready').textContent).toBe('true');
          expect(getByTestId('error.message').textContent).toBe('');
          expect(getByTestId('liff.id').textContent).toBe('myLiffId');
        });
      });
    });

    describe('When the `window.liff.init()` failed', () => {
      beforeEach(() => {
        window.liff.init = jest.fn().mockImplementationOnce(async () => {
          throw new Error('Failed to initialize liff.');
        });
      });

      it('shows error message', async () => {
        const { getByTestId } = render(tree(false));

        await waitFor(() => {
          expect(getByTestId('ready').textContent).toBe('false');
          expect(getByTestId('error.message').textContent).toBe('Failed to initialize liff.');
        });
      });
    });
  });

  describe('When stub is enabled (true)', () => {
    it('shows stubbed liffId', async () => {
      const { getByTestId } = render(tree(true));

      await waitFor(() => {
        expect(getByTestId('ready').textContent).toBe('true');
        expect(getByTestId('error.message').textContent).toBe('');
        expect(getByTestId('liff.id').textContent).toBe('liffId');
      });
    });
  });

  describe('When stub is enabled (object)', () => {
    it('shows overridden liffId', async () => {
      const { getByTestId } = render(tree({ id: 'overriddenLiffId' }));

      await waitFor(() => {
        expect(getByTestId('ready').textContent).toBe('true');
        expect(getByTestId('error.message').textContent).toBe('');
        expect(getByTestId('liff.id').textContent).toBe('overriddenLiffId');
      });
    });
  });
});
