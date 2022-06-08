const fs = require('fs');
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

const parseHobbies = (hobbies) => hobbies.split(',');

const getForm = () => {
  const nameField = new Field('name', 'Please enter your name', isValidName, identity);
  const dobField = new Field('dob', 'Please enter your dob', isValidDob, identity);
  const hobbiesField = new Field('hobbies', 'Please enter your hobbies', isNotEmpty, parseHobbies);
  const phoneNumField = new Field('phoneNum', 'Please enter your phone number', isValidPhoneNumber, identity);

  const form = new Form(nameField, dobField, hobbiesField, phoneNumField);
  return form;
};

const writeToFile = (form) => {
  const details = form.getDetails();
  fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
  console.log('Thank You!!');
  process.exit();
};

const fillForm = (chunk, form, logger) => {
  const detail = chunk.split('\n')[0];
  form.fillField(detail);
  if (form.isFormFilled()) {
    writeToFile(form);
  }
  logger(form.currentQuestion());
};

module.exports = { getForm, fillForm };
