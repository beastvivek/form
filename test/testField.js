const { Field } = require('../src/field.js');
const assert = require('assert');

describe('Field', () => {
  const identity = element => element;

  describe('equals', () => {
    it('Should equate other field', () => {
      const field1 = new Field('name', 'Enter name', identity, identity);
      const field2 = new Field('name', 'Enter name', identity, identity);
      assert.ok(field1.equals(field2));
    });
  });

  describe('getTitle', () => {
    it('Should give the title of the field', () => {
      const field = new Field('name', 'Enter name', identity, identity);
      assert.strictEqual(field.getTitle(), 'name');
    });
  });

  describe('getQuestion', () => {
    it('Should give the question of the field', () => {
      const field = new Field('name', 'Enter name', identity, identity);
      assert.strictEqual(field.getQuestion(), 'Enter name');
    });
  });

  describe('getResponse', () => {
    it('Should give the response for field', () => {
      const field = new Field('name', 'Enter name', identity, identity);
      field.fillResponse('vivek');
      assert.deepStrictEqual(field.getResponse(), {
        title: 'name',
        response: 'vivek'
      });
    });
  });

  describe('validate', () => {
    it('Should give true if validation passes', () => {
      const isFiveLetter = (text) => text.length >= 5;
      const field = new Field('name', 'Enter name', isFiveLetter, identity);
      assert.ok(field.validate('vivek') === true);
    });

    it('Should give false if validation fails', () => {
      const isFiveLetter = (text) => text.length >= 5;
      const field = new Field('name', 'Enter name', isFiveLetter, identity);
      assert.ok(field.validate('abin') === false);
    });
  });

  describe('isFilled', () => {
    it('Should return true if field is filled', () => {
      const field = new Field('name', 'Enter name', identity, identity);
      field.fillResponse('vivek');
      assert.ok(field.isFilled() === true);
    });

    it('Should return false if field is not filled', () => {
      const field = new Field('name', 'Enter name', identity, identity);
      assert.ok(field.isFilled() === false);
    });
  });
});
