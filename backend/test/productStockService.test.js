const test = require('node:test');
const assert = require('node:assert/strict');

const { resolveInitialStock } = require('../src/services/productStockService');

test('new products default to available stock', () => {
  assert.deepEqual(resolveInitialStock({}), {
    available: 100,
    inStock: true,
  });
});

test('an explicitly out-of-stock product starts with zero availability', () => {
  assert.deepEqual(resolveInitialStock({ inStock: false }), {
    available: 0,
    inStock: false,
  });
});

test('an explicit stock quantity controls initial availability', () => {
  assert.deepEqual(resolveInitialStock({ stock: { available: 12 } }), {
    available: 12,
    inStock: true,
  });
});

test('zero explicit stock is preserved', () => {
  assert.deepEqual(resolveInitialStock({ stock: { available: 0 } }), {
    available: 0,
    inStock: false,
  });
});
