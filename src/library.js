const { Field } = require('./field.js');
const { Form } = require('./form.js');

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

const createForm = () => {
  const nameField = new Field('name', 'Please enter your name', isValidName, identity);
  const dobField = new Field('dob', 'Please enter your dob', isValidDob, identity);
  const hobbiesField = new Field('hobbies', 'Please enter your hobbies', isNotEmpty, splitOnCommas);
  const phoneNumField = new Field('phoneNum', 'Please enter your phone number', isValidPhoneNumber, identity);

  const form = new Form(nameField, dobField, hobbiesField, phoneNumField);
  return form;
};

const fillForm = (chunk, form, logger, writeToFile) => {
  const detail = chunk.split('\n')[0];
  form.fillField(detail);
  if (form.isFormFilled()) {
    writeToFile(form);
    return;
  }
  logger(form.currentQuestion());
};

module.exports = {
  createForm, fillForm, isValidName, isValidDob, isNotEmpty, isValidPhoneNumber
};
