const fs = require('fs');
const { Form } = require('./form.js');

const isValidName = (name) => {
  return name.length >= 5 && !/[0-9]/.test(name);
};

const isValidDob = (dob) => {
  return /^\d{4,4}-\d{2,2}-\d{2,2}$/.test(dob);
};

const areValidHobbies = (hobbies) => {
  return hobbies !== '';
};

const isPhNumValid = (phoneNumber) => {
  return /^\d.*$/.test(phoneNumber) && phoneNumber.length === 10;
};

const main = () => {
  process.stdin.setEncoding('utf8');
  const form = new Form();
  form.addField('name', 'Please enter your name', isValidName);
  form.addField('dob', 'Please enter your dob', isValidDob);
  form.addField('hobbies', 'Please enter your hobbies', areValidHobbies);
  form.addField('phNum', 'Please enter your phone number', isPhNumValid);

  console.log(form.currentQuestion());

  process.stdin.on('data', (chunk) => {
    const detail = chunk.split('\n')[0];
    form.addInput(detail);
  });

  process.stdin.on('end', () => {
    const details = form.getDetails();
    fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
    console.log('Thank You!!');
    process.exit();
  });
};

main();
