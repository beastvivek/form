const assert = require('assert');
const { Form } = require('../src/form.js');
const { Field } = require('../src/field.js');

describe('Form', () => {
  const identity = element => element;
  const alwaysTrue = () => true;

  describe('equals', () => {
    it('Should equate other form', () => {
      const field = new Field('name', 'Enter name', alwaysTrue, identity);
      const form1 = new Form(field);
      const form2 = new Form(field);
      assert.ok(form1.equals(form2));
    });
  });

  describe('getDetails', () => {
    it('Should return all the details of responses', () => {
      const field = new Field('name', 'Enter name', alwaysTrue, identity);
      const form = new Form(field);
      form.fillField('vivek');
      assert.deepStrictEqual(form.getDetails(), { name: 'vivek' });
    });
  });

  describe('currentQuestion', () => {
    it('Should give the current question', () => {
      const nameField = new Field('name', 'Enter name', alwaysTrue, identity);
      const dobField = new Field('dob', 'Enter dob', alwaysTrue, identity);
      const form = new Form(nameField, dobField);
      form.fillField('vivek');
      assert.deepStrictEqual(form.currentQuestion(), 'Enter dob');
    });
  });

  describe('isFormFilled', () => {
    it('Should give true if form is filled', () => {
      const field = new Field('name', 'Enter name', alwaysTrue, identity);
      const form = new Form(field);
      form.fillField('vivek');
      assert.ok(form.isFormFilled() === true);
    });

    it('Should give false if form is not filled', () => {
      const field = new Field('name', 'Enter name', alwaysTrue, identity);
      const form = new Form(field);
      assert.ok(form.isFormFilled() === false);
    });
  });

});
