# load chai and use http
chai = require 'chai'
expect = require('chai').expect
chaiHttp = require 'chai-http'
chai.use chaiHttp

# load github params
githubReqObj = require('../helpers/github')

describe "github test", ->

  it "should connect with a 200 status", ->
    res = chai.request(githubReqObj.url)
      .get()
      .req (req) ->
        req.set
            'Accept': 'application/vnd.github.beta+json',
            'User-Agent': 'A test application for homebrew cask dotfile'
        return
      .res (res) ->
        expect(res).to.have.status 200
