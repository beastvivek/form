const fs = require('fs');
const { Form } = require('./form.js');

const isValidName = (name) => {
  return name.length >= 5 && !/[0-9]/.test(name);
};

const isValidDob = (dob) => {
  return /^\d{4}-\d{2}-\d{2}$/.test(dob);
};

const areValidHobbies = (hobbies) => {
  return hobbies !== '';
};

const isPhNumValid = (phoneNumber) => {
  return /^\d{10}$/.test(phoneNumber);
};

const identity = (element) => element;

const parseHobbies = (hobbies) => hobbies.split(',');

const readInput = (form) => {
  console.log(form.currentQuestion());

  process.stdin.on('data', (chunk) => {
    const detail = chunk.split('\n')[0];
    form.register(detail);
    if (form.outOfIndex()) {
      process.stdin.emit('end');
    }
    console.log(form.currentQuestion());
  });

  process.stdin.on('end', () => {
    const details = form.getDetails();
    fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
    console.log('Thank You!!');
    process.exit();
  });
};

const main = () => {
  process.stdin.setEncoding('utf8');
  const form = new Form();
  form.addField('name', 'Please enter your name', isValidName, identity);
  form.addField('dob', 'Please enter your dob', isValidDob, identity);
  form.addField('hobbies', 'Please enter your hobbies', areValidHobbies, parseHobbies);
  form.addField('phNum', 'Please enter your phone number', isPhNumValid, identity);

  readInput(form);
};

main();
