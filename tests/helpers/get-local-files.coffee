chai            = require('chai')
should          = require('chai').should()
chaiAsPromised  = require("chai-as-promised")

getLocalFiles   = require('../../helpers/get-local-files')


chai.use chaiAsPromised


describe "get local files", ->

  files = []

  before ->
    files = getLocalFiles('./helpers')


  it "should return correct number of files", (done) ->
    files.should.be.fulfilled.and.notify(done)

  it "should return correct number of items", (done) ->
    files.should.eventually.have.length(5).and.notify(done)
