# grunt-scaffold

> Automated unit test scaffolding using [public.js](https://github.com/alex-seville/public.js)

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-scaffold --save-dev
```

One the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-scaffold');
```

## The "scaffold" task

### Overview
In your project's Gruntfile, add a section named `scaffold` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  scaffold: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options

#### options.template
Type: `String`

A path to your template file representing the test runner code you want to target.


### Usage Examples

#### Default Options
In this example, we want to load Backbone.js, with Underscore.js as a dependency, and then have qunit tests created, using a QUnit test template.

```js
grunt.initConfig({
  scaffold: {
    options: {
      template: 'test/fixtures/qunit.tmpl',
      source: 'test/fixtures/backbone.js'
    },
    files: {
      'dest/backbone_tests.js': [ 'test/fixtures/underscore.js'],
    },
  },
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
BETA release.  Please help this project become more stable.
