const assert = require('assert');
const app = require('../../src/app');

describe('\'cat\' service', () => {
  it('registered the service', () => {
    const service = app.service('cat');

    assert.ok(service, 'Registered the service (cat)');
  });
});
