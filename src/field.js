class Field {
  #title;
  #question;
  #validator;
  #parser;
  #response;
  constructor(title, question, validator, parser) {
    this.#title = title;
    this.#question = question;
    this.#validator = validator;
    this.#parser = parser;
    this.#response = null;
  }

  isFilled() {
    return this.#response !== null;
  }

  getTitle() {
    return this.#title;
  }

  getQuestion() {
    return this.#question;
  }

  getResponse() {
    return { title: this.#title, response: this.#parser(this.#response) };
  }

  validate(response) {
    return this.#validator(response);
  }

  fillField(response) {
    this.#response = response;
  }
}

module.exports = { Field };
