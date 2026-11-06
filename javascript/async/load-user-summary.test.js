import test from 'node:test';
import assert from 'node:assert/strict';

import { loadUserSummary } from './load-user-summary.js';

test('returns user summary for valid user ID', async () => {
  const result = await loadUserSummary(1);
  assert.deepStrictEqual(result, { name: 'Alex', completedTasks: 2 });
});

test('returns null and correct error message for invalid user ID', async (t) => {
  const errorMock = t.mock.method(console, 'error', () => {});
  const result = await loadUserSummary(2);
  assert.strictEqual(result, null);
  assert.strictEqual(errorMock.mock.callCount(), 1);

  assert.deepStrictEqual(errorMock.mock.calls[0].arguments, [
    'Tasks not found',
  ]);
});
