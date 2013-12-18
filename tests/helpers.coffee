expect = require('chai').expect

removeExtension = require('../helpers/remove-extension')
parameterize    = require('../helpers/parameterize')
messaging       = require('../helpers/messaging')

argv = {}
message = ""


describe "helpers", ->


  describe "remove Extension", ->

    it "should remove the extension", ->
      filename = removeExtension 'test.txt'
      expect(filename).to.equal 'test'

    it "should be okay if there is no extension", ->
      filename = removeExtension 'test'
      expect(filename).to.equal 'test'


  describe "parameterize", ->

    it "should replace spaces with hyphens", ->
      filename = parameterize "this statement has spaces"
      expect(filename).to.equal "this-statement-has-spaces"

    it "should remove punctuation", ->
      filename = parameterize "this ! statement $# has (( spaces"
      expect(filename).to.equal "this-statement-has-spaces"


  describe "arguments", ->

    before ->
      argv = require('optimist')([ '-a', '-f', '-p']).argv

    it "should detect force option", ->
      expect(argv.f).to.be.true

    it "should detect application option", ->
      expect(argv.a).to.be.true

    it "should detect path option", ->
      expect(argv.p).to.be.true


  describe "arguments absent", ->

    before ->
      argv = require('optimist')([]).argv

    it "should not detect missing arguments", ->
      expect(argv.f).to.be.undefined
      expect(argv.a).to.be.undefined
      expect(argv.p).to.be.undefined


  describe "messaging", ->

    it "should return exists message", ->
      message = messaging.exists('test')
      expect(message).to.equal "asdf"


