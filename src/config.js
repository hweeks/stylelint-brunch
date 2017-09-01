module.exports = class OptionsParser {
  constructor(config = {}) {
    this.options = config.stylelint || {};
    this.buildConfig();
  }
  buildConfig() {
    this.options.warnOnly = this.options.warnOnly !== false;
    if (!this.options.pattern) {
      this.options.pattern = /^app[\/\\].*\.css?$/;
    } else {
      this.getPattern();
    }
  }
  getPattern() {
    if (typeof this.options.pattern === 'string') {
      this.options.pattern = new RegExp(this.options.pattern);
    }
    return this.options.pattern;
  }
  buildLintOptions(path) {
    const lintOptions = {};
    const syntax = path.split('.').pop();
    const basePath = path.split('/').slice(0, -1).join('/');
    // If this isn't a CSS file, let's try to figure out what it is
    // There's also a good chance this should handle multiple files
    if (syntax.toLowerCase() !== 'css') {
      lintOptions.syntax = syntax;
      lintOptions.files = `${basePath}/**/*.${syntax}`;
    }
    // Only if we are passing up config do we add the config object
    // If we add nothing it searches for it along the normal path
    if (this.options.config) {
      lintOptions.config = this.options.config;
    }
    if (!this.options.formatter) {
      lintOptions.formatter = 'string';
    }
    return lintOptions;
  }
};
