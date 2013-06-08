/*
 * grunt-public-js
 * https://github.com/alex-seville/grunt-public-js
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    // Configuration to be run (and then tested).
    'public-js': {
      
      default_scaffold: {
        options: {
          type: 'scaffold',
          template: 'test/fixtures/qunit.tmpl'
        },
        files: {
          'tmp/tests.js': ['test/fixtures/test_fcn.js'],
        },
      },

      default_lint: {
        options: {
          type: 'lint'
        },
        files: {
          'test/fixtures/bacbone.js': [],
        },
      },

      failing_lint: {
        options: {
          type: 'lint'
        },
        files: {
          'test/fixtures/test_fcn_failing_lint.js': [],
        },
      },

      backbone_scaffold: {
        options: {
          template: 'test/fixtures/documentation.tmpl',
          source: 'test/fixtures/backbone.js',
          type: 'scaffold',
          makeObject: true
        },
        files: {
          'tmp/backbone_docs.js': ['test/fixtures/underscore.js'],
        },
      },

      backboneTests: {
        options: {
          template: 'test/fixtures/qunit.tmpl',
          source: 'test/fixtures/backbone.js',
          type: 'scaffold',
          makeObject: true
        },
        files: {
          'tmp/backbone_tests.js': ['test/fixtures/underscore.js'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'public-js', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
