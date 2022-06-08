const fs = require('fs');
const { Field } = require('./field.js');
const { Form } = require('./form.js');

const writeToFile = (form) => {
  const details = form.getDetails();
  fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
  console.log('Thank You!!');
  process.exit();
};

const fillForm = (chunk, form) => {
  const detail = chunk.split('\n')[0];
  form.fillField(detail);
  if (form.isFormFilled()) {
    process.stdin.emit('end');
  }
  console.log(form.currentQuestion());
};

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

const readInput = (form) => {
  console.log(form.currentQuestion());

  process.stdin.on('data', (chunk) => {
    fillForm(chunk, form);
  });

  process.stdin.on('end', () => {
    writeToFile(form);
  });
};

const main = () => {
  process.stdin.setEncoding('utf8');
  const nameField = new Field('name', 'Please enter your name', isValidName, identity);
  const dobField = new Field('dob', 'Please enter your dob', isValidDob, identity);
  const hobbiesField = new Field('hobbies', 'Please enter your hobbies', isNotEmpty, parseHobbies);
  const phoneNumField = new Field('phoneNum', 'Please enter your phone number', isValidPhoneNumber, identity);

  const form = new Form(nameField, dobField, hobbiesField, phoneNumField);

  readInput(form);
};

main();
