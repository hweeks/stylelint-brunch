# stylelint-brunch
> Adding [Stylelint](http://www.stylelint.io) support to [brunch](http://www.brunch.io).

## installation

Install the plugin via npm:

    npm i -D stylelint-brunch

## configuration

There is no needed configuration. If you install this package it will attempt the standard lookup for a style-lint file and lint all css files. This assumes you have CSS files and want to use your system lint configuration.

For SASS, you can use this configuration:

```javascript
config = {
  stylelint: {
    pattern: '^app[\\\/\\\\].*\\\.scss?$'
  }
}
```

The `pattern` parameter is evaluated in a `new RegExp()` call. Change the pattern to match your desired file type.

## auto configuration

There are a few things I'm doing here to hopefully make this easier to use.

  1. attempt to figure out the file syntax
  1. only add the configuration you pass up if there is a rules key
  1. have the formatter set to string, there is no override for this

## license

Licensed under the [Apache-2.0 license](https://github.com/hweeks/stylelint-brunch/blob/master/LICENSE).

## shout out

Thanks @mirko-lelansky, this is extended from his base project.

## todo

Add some decent tests
