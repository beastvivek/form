const { getForm, fillForm } = require('./src/library.js');

const main = () => {
  process.stdin.setEncoding('utf8');
  const form = getForm();

  console.log(form.currentQuestion());

  process.stdin.on('data', (chunk) => {
    fillForm(chunk, form, console.log);
  });
};

main();
