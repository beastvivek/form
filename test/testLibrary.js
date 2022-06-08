const assert = require('assert');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');
const { isValidName, isValidDob,
  isNotEmpty, fillForm } = require('../src/library.js');

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

describe('fillForm', () => {
  const identity = element => element;
  const alwaysTrue = () => true;

  it('Should log the next question', () => {
    const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
    const dobField = new Field('dob', 'Enter dob', alwaysTrue, identity);
    const form = new Form(nameField, dobField);
    const loggedTexts = [];
    const logger = (text) => loggedTexts.push(text);
    fillForm('vivek', form, logger, identity);
    assert.deepStrictEqual(loggedTexts, ['Enter dob']);
  });

  it('Should call the callback when form is filled', () => {
    const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
    const form = new Form(nameField);
    let callbackText = '';
    const callback = (form) => {
      callbackText = form.getDetails();
    };
    fillForm('vivek', form, identity, callback);
    assert.deepStrictEqual(callbackText, { name: 'vivek' });
  });
});
