const fs = require('fs');

class Form {
  constructor(fields, validators, questions) {
    this.fields = fields;
    this.validators = validators;
    this.questions = questions;
    this.index = 0;
    this.details = {};
  }

  #outOfIndex() {
    return this.index >= this.fields.length;
  }

  #endStdIn() {
    process.stdin.emit('end');
  }

  takeInput(detail) {
    if (this.validators[this.index](detail)) {
      this.details[this.fields[this.index]] = detail;
      this.index++;
      if (this.#outOfIndex()) {
        return this.#endStdIn();
      }
      console.log(this.questions[this.index]);
      return;
    }
    console.log('Invalid input');
    console.log(this.questions[this.index]);
  }
}

const isValidName = (name) => {
  return name.length >= 5 && !/[0-9]/.test(name);
};

const isValidDob = (dob) => {
  return /^\d\d\d\d-\d\d-\d\d$/.test(dob);
};

const areValidHobbies = (hobbies) => {
  return hobbies !== '';
};

const isPhoneNumberValid = (phoneNumber) => {
  return /^\d.*$/.test(phoneNumber) && phoneNumber.length === 10;
};

const main = () => {
  const fields = ['name', 'dob', 'hobbies', 'phoneNumber'];
  const validators = [
    isValidName, isValidDob, areValidHobbies, isPhoneNumberValid
  ];
  const questions = [
    'Please enter your name',
    'Please enter your DOB',
    'Please enter your hobbies',
    'Please enter your phone number'
  ];
  process.stdin.setEncoding('utf8');
  const form = new Form(fields, validators, questions);
  console.log('Please enter your', fields[0]);
  process.stdin.on('data', (chunk) => {
    const detail = chunk.split('\n')[0];
    form.takeInput(detail);
  });
  process.stdin.on('end', () => {
    fs.writeFileSync('./details.json', JSON.stringify(form.details), 'utf8');
    console.log('Thank You!!');
    process.exit();
  });
};

main();
