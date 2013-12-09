expect = require('chai').expect

removeExtension = require('../helpers/remove-extension')
parameterize    = require('../helpers/parameterize')
parseArgs       = require('../helpers/parse-arg')

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

  describe "parse-args", ->

    it "should return true if -A flag is set", ->
      arg = "node app -A"
      arg = arg.split(' ')
      expect(parseArgs(arg)).to.be.true

    it "should return false if -A flag is not set", ->
      arg = "node app"
      arg = arg.split(' ')
      expect(parseArgs(arg)).to.be.false
