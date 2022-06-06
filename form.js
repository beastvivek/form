const fs = require('fs');

const isValidName = (name) => {
  return name.length >= 5 && /[0-9]/.test(name);
};

const isValidDob = (dob) => {
  return /^\d-\d-\d$/.test(dob);
};

const areValidHobbies = (hobbies) => {
  return hobbies !== '';
};

const main = () => {
  const details = {};
  const fields = ['name', 'DOB', 'Hobbies'];
  const validators = [isValidName, isValidDob, areValidHobbies];
  process.stdin.setEncoding('utf8');
  let counter = 0;
  console.log('Please enter your', fields[counter]);
  process.stdin.on('data', (chunk) => {
    const userDetails = chunk.split('\n')[0];
    if (validators[counter](userDetails)) {
      details[fields[counter]] = userDetails;
      counter++;
      console.log('Please enter your', fields[counter]);
    } else {
      console.log('Invalid Input');
    }
    if (counter >= fields.length) {
      fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
      process.stdin.emit('end');
    }
  });
  process.stdin.on('end', () => {
    console.log('Thank You!!');
    process.exit();
  });
};

main();
