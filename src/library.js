const { Field } = require('./field.js');
const { Form } = require('./form.js');
const { MultiLineField } = require('./multiLineField.js');

const isValidName = (name) => {
  return name.length >= 5 && !/[0-9]/.test(name);
};

const isValidDob = (dob) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dob);
};

const isNotEmpty = (text) => {
  return text !== '';
};

const isValidPhoneNumber = (number) => {
  return /^\d{10}$/.test(number);
};

const identity = (element) => element;
const splitOnCommas = (text) => text.split(',');
const joinWithNewLine = (lines) => lines.join('\n');

const createAddressField = () => {
  const title = 'address';
  const questions = [
    'Please enter your address line 1', 'Please enter your address line 2'
  ];
  const validator = isNotEmpty;
  const addressField = new MultiLineField(title, questions, validator, joinWithNewLine);
  return addressField;
};

const createForm = () => {
  const nameField = new Field('name', 'Please enter your name', isValidName, identity);
  const dobField = new Field('dob', 'Please enter your dob', isValidDob, identity);
  const hobbiesField = new Field('hobbies', 'Please enter your hobbies', isNotEmpty, splitOnCommas);
  const phoneNumField = new Field('phoneNum', 'Please enter your phone number', isValidPhoneNumber, identity);
  const addressField = createAddressField();

  const form = new Form(nameField, dobField, hobbiesField, phoneNumField, addressField);
  return form;
};

const fillForm = (chunk, form, logger, callBack) => {
  const details = chunk.trim().split('\n');
  details.forEach((detail) => {
    try {
      form.fillField(detail);
    } catch (error) {
      logger('Invalid Input');
    }
    if (form.isFormFilled()) {
      callBack(form.getDetails());
      return;
    }
    logger(form.currentQuestion());
  });
};

module.exports = {
  createForm, fillForm, isValidName, isValidDob, isNotEmpty, isValidPhoneNumber
};
