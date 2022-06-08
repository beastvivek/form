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

  fillResponse(response) {
    this.#response = response;
  }

  #equalityCheck(otherField) {
    return this.#title === otherField.#title &&
      this.#question === otherField.#question &&
      this.#validator === otherField.#validator &&
      this.#parser === otherField.#parser;
  }

  equals(otherField) {
    return otherField instanceof Field && this.#equalityCheck(otherField);
  }
}

module.exports = { Field };
