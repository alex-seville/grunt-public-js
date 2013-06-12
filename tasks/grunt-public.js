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

  grunt.registerMultiTask('public-js', 'Your task description goes here.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      lintOptions: {}
    });

    if (!options.type){
      grunt.log.warn('You must provide a task type.');
      return false;
    }

    if (options.type === 'scaffold'){
      scaffolds.call(this,options,this.files);
    }else if (options.type === 'lint'){
      lint.call(this,options,this.files);
    }

    
  });

  function scaffolds(options,files){
    if (!options.template){
      grunt.log.warn('You must provide a template.');
      return false;
    }

    // Iterate over all specified file groups.
    files.forEach(function(f) {
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

      if (src.length === 1 && !options.source ){
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
      var testStr = unitTest({data: output});
      grunt.file.write(f.dest,testStr);
      // Print a success message.
      grunt.log.writeln('Created test scaffolds');
    });
  }

  function lint(options,files){
    var errors=[];
    // Iterate over all specified file groups.
    files.forEach(function(f) {
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

      var output, dest = grunt.file.read(f.dest);

      var errorCallback = function(name,details){
        errors.push("Error when accessing "+details+"."+name+" in "+ f.dest);
      };

      
        if (src.length > 0 ){
          output = publicjs.getPublic(dest,{
            dependencies: src,
            errorCallback: errorCallback,
            tree:true
          });
        }else{
          output = publicjs.getPublic(dest,{
            errorCallback: errorCallback,
            tree:true
          });
        } 
    });
    //check exportOnly
    if (options.lintOptions.exportOnly){
      if (options.lintOptions.exportOnly.length === 0 && output.length !== 0){
        errors.push("Expected nothing to be exported, but saw: "+output.map(function(o){ return o.name; }));
      }else if (options.lintOptions.exportOnly.length > 0 && output.length === 0){
        errors.push("Nothing was exported.");
      }else{
        //we have exports, and we expect exports
        //we need to make sure that all expected were
        //exported and that only expected were exported
        //we should take all the leaf nodes and record their path value
        //then compare that against the expected array.
        //any results left, or any non matches should be recorded as an error.
      }
    }
    
    //display result
    if (errors.length > 0){
        grunt.log.warn("Public-lint error"+(errors.length > 1 ? "s" : "") + ": ");
        errors.forEach(function(e){
          grunt.log.warn(e);
        })
        grunt.fatal("Public-lint failed.");
      }
      grunt.log.writeln('Public-lint completed successfully.');
  }

};
