const assert = require('assert');
const app = require('../../src/app');

describe('\'dog\' service', () => {
  it('registered the service', () => {
    const service = app.service('dog');

    assert.ok(service, 'Registered the service (dog)');
  });
});
