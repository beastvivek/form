class MultiLineField {
  #title;
  #questions;
  #validator;
  #parser;
  #responses;
  #index;
  constructor(title, questions, validator, parser) {
    this.#title = title;
    this.#questions = questions;
    this.#validator = validator;
    this.#parser = parser;
    this.#responses = [];
    this.#index = 0;
  }

  isFilled() {
    return this.#responses.length === this.#questions.length;
  }

  getTitle() {
    return this.#title;
  }

  getQuestion() {
    return this.#questions[this.#index];
  }

  getResponse() {
    return { title: this.#title, response: this.#parser(this.#responses) };
  }

  validate(response) {
    return this.#validator(response);
  }

  fillResponse(response) {
    this.#responses[this.#index] = response;
    this.#index++;
  }
}

module.exports = { MultiLineField };
