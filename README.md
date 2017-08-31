# stylelint-brunch
> Adding [Stylelint](http://www.stylelint.io) support to [brunch](http://www.brunch.io).

## installation

Install the plugin via npm:

    npm i -D stylelint-brunch

## configuration

There is no needed configuration. If you install this package it will attempt the standard lookup for a style-lint file and lint all css files. This assumes you have CSS files and want to use your system lint configuration.

### pattern

For SASS, you can use this configuration:

```javascript
config = {
  stylelint: {
    pattern: '^app[\\\/\\\\].*\\\.scss?$'
  }
}
```

The `pattern` parameter is evaluated in a `new RegExp()` call if it's a string. Change the pattern to match your desired file type.

### warnOnly

Passing a warnOnly key allows you to prevent errors from being thrown. This defaults to true.

```javascript
config = {
  stylelint: {
    warnOnly: false
  }
}
```

### formatter

Passing a formatter key allows you to select your preferred formatter. This defaults to `string`.

```javascript
config = {
  stylelint: {
    formatter: 'json'
  }
}
```

### config

Passing any valid stylelint options here are supported and override ad you'd expect.

```javascript
config = {
  stylelint: {
    config: {
      // whatever you want to pass that's valid stylelint options.
    }
  }
}
```

## license

Licensed under the [Apache-2.0 license](https://github.com/hweeks/stylelint-brunch/blob/master/LICENSE).

## shout out

Thanks @mirko-lelansky, this is extended from his base project.

## todo

Add some decent tests
