const { MultiLineField } = require('../src/multiLineField.js');
const assert = require('assert');

describe('MultiLineField', () => {
  const identity = element => element;
  const alwaysTrue = () => true;
  const joinWithNewLine = (lines) => lines.join('\n');

  describe('getTitle', () => {
    it('Should give the title of the field', () => {
      const questions = ['line 1', 'line2'];
      const field = new MultiLineField('add', questions, alwaysTrue, identity);
      assert.strictEqual(field.getTitle(), 'add');
    });
  });

  describe('getQuestion', () => {
    it('Should give the question of the field', () => {
      const questions = ['line 1', 'line2'];
      const field = new MultiLineField('add', questions, alwaysTrue, identity);
      assert.strictEqual(field.getQuestion(), 'line 1');
    });
  });

  describe('getResponse', () => {
    it('Should give the response for field', () => {
      const questions = ['line 1', 'line2'];
      const field = new MultiLineField(
        'add', questions, alwaysTrue, joinWithNewLine
      );
      field.fillResponse('vivek');
      field.fillResponse('bisht');
      assert.deepStrictEqual(field.getResponse(), {
        title: 'add',
        response: 'vivek\nbisht'
      });
    });
  });

  describe('validate', () => {
    it('Should give true if validation passes', () => {
      const isNotEmpty = (text) => text !== '';
      const field = new MultiLineField(
        'add', 'Enter add', isNotEmpty, identity
      );
      assert.ok(field.validate('vivek') === true);
    });

    it('Should give false if validation fails', () => {
      const isNotEmpty = (text) => text !== '';
      const field = new MultiLineField(
        'add', 'Enter add', isNotEmpty, identity
      );
      assert.ok(field.validate('') === false);
    });
  });

  describe('isFilled', () => {
    const questions = ['line 1', 'line2'];
    it('Should return true if field is filled', () => {
      const field = new MultiLineField(
        'add', questions, alwaysTrue, identity
      );
      field.fillResponse('vivek');
      field.fillResponse('bisht');
      assert.ok(field.isFilled() === true);
    });

    it('Should return false if field is not filled', () => {
      const field = new MultiLineField(
        'add', questions, alwaysTrue, identity
      );
      assert.ok(field.isFilled() === false);
    });
  });
});
