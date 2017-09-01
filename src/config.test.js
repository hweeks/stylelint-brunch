const {assert} = require('chai'),
  OptionsParser = require('./config'),
  stylelintConfigs = [
    {},
    { pattern: /^app[\/\\].*\.scss?$/ },
    { pattern: '^app[\\\/\\\\].*\\\.scss?$' },
    {
      config: {
        rules: {
          example: 'rule'
        }
      }
    },
    { config: "test" },
    { warnOnly: false },
    { formatter: "json" },
    { formatter: false }
  ],
  defaultConfig = {
    pattern: /^app[\/\\].*\.css?$/,
    warnOnly: true
  }

describe('Testing OptionsParser', () => {
  for (let currentConfig of stylelintConfigs) {
    let startedClass = null;
    it('Starts without error', () => {
      let message = null;
      try {
        startedClass = new OptionsParser({stylelint: currentConfig});
      } catch (e) {
        message = e;
      }
      assert.isNull(message);
    });
    if (currentConfig.pattern) {
      it('Parses passed pattern correctly', () => {
        let internalPattern = startedClass.getPattern(),
          passedPattern = new RegExp(currentConfig.pattern);
        assert.equal(internalPattern.text, passedPattern.text);
      });
    } else {
      it('Parses pattern correctly', () => {
        let internalPattern = startedClass.getPattern();
        assert.isOk(internalPattern instanceof RegExp);
      });
    }
  }
});
