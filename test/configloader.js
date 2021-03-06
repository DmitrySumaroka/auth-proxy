var should = require('should');
var path = require('path');
var app = require('../index');

var ConfigLoader = app.ConfigLoader;

var configDir = path.resolve(path.join('.', 'test', 'fixtures', 'ConfigLoader', 'json-objects'));

describe('ConfigLoader', function() {
  describe('load', function() {
    it('should load configuration from a single file and merge it with the default', function(done) {
      done();
    });
  });
  describe('loadDir', function() {
    it('should combine config objects', function(done) {
      var configDir = path.resolve(path.join('.', 'test', 'fixtures', 'ConfigLoader', 'json-objects'));
      ConfigLoader.logErrors = false;
      ConfigLoader.loadDirAsArray(configDir, function(error, conf) {
        should.exist(conf);
        conf.should.be.instanceof(Array).and.have.lengthOf(2);
        conf[0].foo.should.equal('bar');
        conf[1].bar.should.equal('bot');
        conf[1].plink.should.equal('plunk');
        done(error);
      });
    });
  });
  describe('loadDirAsMergedObject', function() {
    it('should load an array of config objects', function(done) {
      ConfigLoader.loadDirAsMergedObject(configDir, function(error, conf) {
        conf.foo.should.equal('bar');
        conf.bar.should.equal('bot');
        conf.plink.should.equal('plunk');
        done(error);
      });
    });
  });
});
