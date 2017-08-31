'use strict';

const stylelint = require('stylelint');

class StyleLinter {
  constructor(config) {
    this.config = config.plugins.stylelint || {};
    this.warnOnly = config.warnOnly !== false;
    // Here we can override the default pattern
    this.pattern = /^app[\/\\].*\.css?$/;
    if (this.config.pattern) {
      this.pattern = new RegExp(this.config.pattern);
    }
  }
  lint(data, path) {
    const syntax = path.split('.').pop();
    const lintOptions = {};
    const basePath = path.split('/').slice(0, -1).join('/');

    // If this isn't a CSS file, let's try to figure out what it is
    // There's also a good chance this should handle multiple files
    if (syntax.toLowerCase() !== 'css') {
      lintOptions.syntax = syntax;
      lintOptions.files = `${basePath}**/*.${syntax}`;
    }
    // Only if we are passing up config do we add the config object
    // If we add nothing it searches for it along the normal path
    if (this.config.rules) {
      lintOptions.config = this.config;
    }
    // I'm forcing the formatter to strig for readability
    lintOptions.formatter = 'string';
    return stylelint.lint(lintOptions).then((result) => {
      console.log(result.output);
    }).catch((error) => {
      throw new Error('stylelint stack error' + error);
    });
  }
}

StyleLinter.prototype.brunchPlugin = true;
StyleLinter.prototype.type = 'stylesheet';
StyleLinter.prototype.extensions = 'css';

module.exports = StyleLinter;
