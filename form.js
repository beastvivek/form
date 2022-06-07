class Form {
  #index;
  #details;
  #fields;
  constructor() {
    this.#fields = [];
    this.#index = 0;
    this.#details = {};
  }

  outOfIndex() {
    return this.#index >= this.#fields.length;
  }

  currentQuestion() {
    return this.#fields[this.#index].question;
  }

  #incrementIndex() {
    this.#index++;
  }

  getDetails() {
    return this.#details;
  }

  addField(title, question, validator, parser) {
    this.#fields.push({ title, question, validator, parser });
  }

  register(detail) {
    const field = this.#fields[this.#index];
    if (field.validator(detail)) {
      this.#details[field.title] = this.#fields[this.#index].parser(detail);
      this.#incrementIndex();
    }
  }
}

exports.Form = Form;
