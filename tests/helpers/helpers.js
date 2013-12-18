// Generated by CoffeeScript 1.6.3
(function() {
  var argv, expect, message, messaging, parameterize, removeExtension;

  expect = require('chai').expect;

  removeExtension = require('../../helpers/remove-extension');

  parameterize = require('../../helpers/parameterize');

  messaging = require('../../helpers/messaging');

  argv = {};

  message = "";

  describe("helpers", function() {
    describe("remove Extension", function() {
      it("should remove the extension", function() {
        var filename;
        filename = removeExtension('test.txt');
        return expect(filename).to.equal('test');
      });
      return it("should be okay if there is no extension", function() {
        var filename;
        filename = removeExtension('test');
        return expect(filename).to.equal('test');
      });
    });
    describe("parameterize", function() {
      it("should replace spaces with hyphens", function() {
        var filename;
        filename = parameterize("this statement has spaces");
        return expect(filename).to.equal("this-statement-has-spaces");
      });
      return it("should remove punctuation", function() {
        var filename;
        filename = parameterize("this ! statement $# has (( spaces");
        return expect(filename).to.equal("this-statement-has-spaces");
      });
    });
    describe("arguments", function() {
      before(function() {
        return argv = require('optimist')(['-a', '-f', '-p']).argv;
      });
      it("should detect force option", function() {
        return expect(argv.f).to.be["true"];
      });
      it("should detect application option", function() {
        return expect(argv.a).to.be["true"];
      });
      return it("should detect path option", function() {
        return expect(argv.p).to.be["true"];
      });
    });
    describe("arguments absent", function() {
      before(function() {
        return argv = require('optimist')([]).argv;
      });
      return it("should not detect missing arguments", function() {
        expect(argv.f).to.be.undefined;
        expect(argv.a).to.be.undefined;
        return expect(argv.p).to.be.undefined;
      });
    });
    return describe("messaging", function() {
      it("should return exists message", function() {
        message = messaging.exists('test');
        return expect(message).to.equal("test already exists!  Change path or add -f to force.");
      });
      it("should return not-installed message", function() {
        message = messaging.notInstalled('test');
        return expect(message).to.equal("Looks like you don't have test installed.  You should consider it!");
      });
      return it("should return write-fail message", function() {
        message = messaging.writeFail('test');
        return expect(message).to.equal("ERROR: test was not written!");
      });
    });
  });

}).call(this);