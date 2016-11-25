class StyleLinter {

  constructor(config) {
  }
}

StyleLinter.prototype.brunchPlugin = true;
StyleLinter.prototype.type = 'stylesheet';
StyleLinter.prototype.extensions = 'css';

module.exports = StyleLinter;
