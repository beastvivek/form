const fs = require('fs');
const { createForm, fillForm } = require('./src/library.js');

const writeToFile = (details) => {
  fs.writeFileSync('./details.json', JSON.stringify(details), 'utf8');
  console.log('Thank You!!');
  process.exit();
};

const main = () => {
  process.stdin.setEncoding('utf8');
  const form = createForm();

  console.log(form.currentQuestion());

  process.stdin.on('data', (chunk) => {
    fillForm(chunk, form, console.log, writeToFile);
  });
};

main();
