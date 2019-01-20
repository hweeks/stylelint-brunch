"use strict";

const stylelint = require("stylelint");
const Debug = require("debug");

const debug = Debug("stylelint-brunch");

class StyleLinter {
  constructor(config) {
    const params = config.plugins.stylelint || {};
    this.lintOptions = params.options || {};
    this.pattern = params.pattern || /^app\/.*\.css$/;
    this.warnOnly = params.warnOnly != null ? params.warnOnly : true;
    this.cache = params.cache != null ? params.cache : true;

    if (!this.lintOptions.formatter) {
      this.lintOptions.formatter = "string";
    }
    if (!this.lintOptions.config && params.config) {
      this.lintOptions.config = params.config;
    }
  }

  lint(file) {
    const warnOnly = this.warnOnly;
    const ext = file.path.split(".").pop();

    if (ext !== 'css') {
      this.lintOptions.syntax = ext;
    }

    this.lintOptions.code = file.data;
    this.lintOptions.codeFilename = file.path;

    return stylelint
      .lint(this.lintOptions)
      .then(data => {
        if (data.output) {
          debug(data.output);
        }
        if (data.errored) {
          debug("stylelint error:");

          if (warnOnly) {
            debug(data.errored);
          } else {
            throw data.errored;
          }
        }
      })
      .catch(err => {
        if (warnOnly) {
          debug(err);
        } else {
          throw err.stack;
        }
      });
  }
}

StyleLinter.prototype.brunchPlugin = true;
StyleLinter.prototype.type = "stylesheet";
StyleLinter.prototype.extensions = "css";

module.exports = StyleLinter;
