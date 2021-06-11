import { configure } from '@testing-library/dom';
import fetchMock from 'fetch-mock';
import { cache } from 'swr';
import * as uuid from 'uuid';
jest.setTimeout(300000);
// Globally implement the uuid with a reset function, so that each test case would start the id from 0
jest.mock('uuid', () => {
  let count = 0;
  function createV4Mock() {
    return function () {
      return `${++count}`;
    };
  }
  return {
    v4: jest.fn(createV4Mock()),
    reset: () => (count = 0)
  };
});
// by pass the "beforeEach" hooks for this case, as we always want a fresh start for the uuid count
// eslint-disable-next-line jest/no-hooks
beforeEach(() => {
  ((uuid as unknown) as { reset: () => void }).reset();
});
// eslint-disable-next-line jest/no-hooks
afterEach(async () => {
  cache.clear();
  // TODO: remove next line once this issue is fixed https://github.com/vercel/swr/issues/781
  await new Promise(requestAnimationFrame);
});
configure({
  defaultHidden: true
});
fetchMock.config.fallbackToNetwork = false;
// @ts-expect-error
window.ResizeObserver ??= function ResizeObserver(
  callback: (entries: unknown[]) => void
) {
  callback([{ contentRect: { width: 1920, height: 1080 } }]);
  return {
    observe() { },
    disconnect() { }
  };
};
