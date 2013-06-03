/*
 * grunt-scaffold
 * https://github.com/alex-seville/scaffold.js
 *
 * Copyright (c) 2013 alex-seville
 * Licensed under the MIT license.
 */

'use strict';

var publicjs = require("public.js");
var _ = require("underscore");

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('scaffold', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      
    });

    if (!options.template){
      grunt.log.warn('You must provide a template.');
      return false;
    }
    if (!options.template){
      grunt.log.warn('You must provide a template.');
      return false;
    }

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return grunt.file.read(filepath);
      });

      var output;

      if (src.length === 1){
        output = publicjs.getPublic(src[0],{
          tree:true
        });
      }else{
        if (!options.source){
          grunt.log.warn('You must provide a configuration option for the main source file.');
          return false;
        }
        output = publicjs.getPublic(grunt.file.read(options.source),{
            dependencies: src,
            tree:true
          });
      }

      var template = grunt.file.read(options.template);
      var unitTest = _.template(template);

      var testStr = "";
      var count=0;
      output.forEach(function(item){
        if (item.type == "function"){
          testStr += unitTest({
            testname: item.name + " test",
            result: item.name + "()",
            expected: "null"
          }) + "\n";
          count++;
        }
      });
      grunt.file.write(f.dest,testStr);
      // Print a success message.
      grunt.log.writeln('Created ' + count + ' test scaffolds');
    });
  });

};
