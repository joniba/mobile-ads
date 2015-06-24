var chai = require('chai');
var offers = require('../offers.js')();
var settings = require('../config.js')();
var chaiAsPromised = require("chai-as-promised");

before(function () {
  chai.should();
  chai.use(chaiAsPromised);
});

describe('offers', function () {
  describe('#getOffers', function () {
    it('should return offers model', function (done) {
      this.timeout(8000);
      
      offers.getOffers({
        ca_api_url: 'http://sync.yeahmobi.com/sync/offer/get',
        ca_api_id: settings.apiId,
        ca_api_token: settings.apiToken
      }).done(function (result) {
        console.log(result);
        result.should.have.length(10);
        result[0].should.have.property('io_external_offer_id');
        result[0].should.have.property('io_app_name');
        
        done();
      });
    });
  });
});