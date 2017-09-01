'use strict';

const stylelint = require('stylelint');
const Config = require('./config');

class StyleLinter {
  constructor(config = {}) {
    this.parser = new Config(config.plugins);
    this.pattern = this.parser.getPattern();
  }
  lint(data, path) {
    const lintOptions = this.parser.buildLintOptions(path);
    return stylelint.lint(lintOptions).then(
      (result) => {
        if (result.output) {
          console.log(result.output);
        }
        if (!(this.parser.options.warnOnly || !result.errored)) {
          throw new Error(
            'Oh no! You\'ve got some real stylelint issues here.'
          );
        }
      }
    );
  }
}

StyleLinter.prototype.brunchPlugin = true;
StyleLinter.prototype.type = 'stylesheet';
StyleLinter.prototype.extensions = 'css';

module.exports = StyleLinter;
