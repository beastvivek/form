const assert = require('assert');
const { isValidName, isValidDob, isNotEmpty } = require('../src/library.js');

describe('isValidName', () => {
  it('Should validate a name', () => {
    assert.ok(isValidName('vivek') === true);
    assert.ok(isValidName('abin') === false);
  });
});

describe('isValidDob', () => {
  it('Should validate date of birth', () => {
    assert.ok(isValidDob('1999-11-23') === true);
    assert.ok(isValidDob('199-11-2') === false);
  });
});

describe('isNotEmpty', () => {
  it('Should not be an empty string', () => {
    assert.ok(isNotEmpty('vivek') === true);
    assert.ok(isNotEmpty('') === false);
  });
});
