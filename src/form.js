class Form {
  #index;
  #fields;
  constructor(...fields) {
    this.#fields = fields;
    this.#index = 0;
  }

  isFormFilled() {
    return this.#fields.every((field) => {
      return field.isFilled();
    });
  }

  #currentField() {
    return this.#fields[this.#index];
  }

  currentQuestion() {
    return this.#currentField().getQuestion();
  }

  getDetails() {
    return this.#fields.reduce((details, field) => {
      const { title, response } = field.getResponse();
      details[title] = response;
      return details;
    }, {});
  }

  fillField(response) {
    if (this.#currentField().validate(response)) {
      this.#currentField().fillField(response);
      this.#index++;
    }
  }
}

module.exports = { Form };