# load chai and use http
chai = require 'chai'
expect = require('chai').expect
chaiHttp = require 'chai-http'
chai.use chaiHttp

# load github params
githubReqObj = require('../helpers/github')

describe "github test", ->
  res = {}

  before (done) ->
    chai.request(githubReqObj.url)
      .get('')
      .req (req) ->
        req.set
            'Accept': 'application/vnd.github.beta+json',
            'User-Agent': 'A test application for homebrew cask dotfile'
      .res (response) ->
        res = response
        done()

  it "should connect with a 200 status", ->
    expect(res).to.have.status 200

  it "should have headers", ->
    expect(res).to.have.headers

  it "should respond with json", ->
    expect(res).to.be.json
