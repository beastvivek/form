const fs = require('fs');

const main = () => {
  let counter = 1, name, dob;
  process.stdin.setEncoding('utf8');
  console.log('Please enter your name : ');
  process.stdin.on('data', (chunk) => {
    const userDetails = chunk.split('\n')[0];
    if (counter === 1) {
      name = userDetails;
      console.log('Please enter your DOB(yyyy-mm-dd) : ');
    } else if (counter === 2) {
      dob = userDetails;
      console.log('Please enter your hobbies : ');
    } else if (counter === 3) {
      const hobbies = userDetails.split(',');
      const details = { name, dob, hobbies };
      fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
    }
    counter++;
  });
  process.stdin.on('end', () => {
    console.log('Thank You!!');
  });
};

main();
