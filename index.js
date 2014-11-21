#!/usr/bin/env node

var exec       = require('child_process').exec;
var sys        = require('sys');
var fs         = require('fs');
var q          = require('q');
var program    = require('commander');

// Private functions
var promiseListOfInstalledPlugins = function() {
  var deferred = q.defer();
  exec('cordova plugins list', function(error, stdout, stderr) {
    var lines = stdout.split('\n');
    var plugins = lines.reduce(function(previousLine, currentLine) {
      fields = currentLine.split(' ');
      if (fields.length > 1) {
        var newLine = fields[0] + '@' + fields[1];
        return previousLine.concat(newLine);
      }
      else {
        return previousLine;
      }
    }, []);
    deferred.resolve(plugins);
  });
  return deferred.promise;
};

var doesArrayContain = function(array, element) {
  return array.some(function(arrayElement) {
    return arrayElement == element;
  });
};

// Exported functions
var verify = function() {
  promiseListOfInstalledPlugins().then(function(installedPlugins) {
    var plugins = JSON.parse(fs.readFileSync('plugins.json'));
    plugins.forEach(function(plugin) {
      if (doesArrayContain(installedPlugins, plugin)) {
        sys.puts(plugin + ' is installed');
      }
      else {
        throw new Error('Plugin "' + plugin +
          '" is not installed.');
      }
    });
  }).done();
};

var install = function() {
  var plugins = JSON.parse(fs.readFileSync('plugins.json'));
  plugins.forEach(function(plugin) {
    exec('cordova plugin add ' + plugin,
      function(error, stdout, stderr) {
        sys.puts(stdout);
      }
    );
  });
};

exports.verify = verify;
exports.install = install;

// CLI
program
  .version('0.0.1');

program
  .command('verify')
  .description('Verify plugins in package.json are installed')
  .action(function() {
    verify();
  });

program
  .command('install')
  .description('Install cordova plugins specified in package.json')
  .action(function() {
    install();
  });

program.parse(process.argv);
