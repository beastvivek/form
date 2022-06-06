const fs = require('fs');

class Form {
  #index;
  #details;
  #fields;
  constructor() {
    this.#fields = [];
    this.#index = 0;
    this.#details = {};
  }

  #outOfIndex() {
    return this.#index >= this.#fields.length;
  }

  getFirstQuestion() {
    return this.#fields[0].question;
  }

  #endStdIn() {
    process.stdin.emit('end');
  }

  getDetails() {
    return this.#details;
  }

  addField(field, question, validator) {
    this.#fields.push({ field, question, validator });
  }

  addInput(detail) {
    if (this.#fields[this.#index].validator(detail)) {
      this.#details[this.#fields[this.#index].field] = detail;
      if (this.#fields[this.#index].field === 'hobbies') {
        this.#details[this.#fields[this.#index].field] = detail.split(',');
      }
      this.#index++;
      if (this.#outOfIndex()) {
        return this.#endStdIn();
      }
      console.log(this.#fields[this.#index].question);
      return;
    }
    console.log('Invalid input');
    console.log(this.#fields[this.#index].question);
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
  console.log(form.getFirstQuestion());
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
