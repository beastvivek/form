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

  currentQuestion() {
    return this.#fields[this.#index].question;
  }

  #incrementIndex() {
    this.#index++;
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
      this.#incrementIndex();
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

exports.Form = Form;
