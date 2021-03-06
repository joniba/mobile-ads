﻿require('chai').should();
var offers = require('../offers.js')();
var settings = require('../config.js')();

describe('offers', function () {
  describe('#getOffers', function () {
    it('should return offers model', function (done) {
      this.timeout(10000);
      
      offers.getOffers({
        ca_api_url: 'http://sync.yeahmobi.com/sync/offer/get',
        ca_api_id: settings.apiId,
        ca_api_token: settings.apiToken
      }).done(function (result) {
        result.should.have.length(10);
        result[0].should.have.property('io_external_offer_id');
        result[0].should.have.property('io_app_name');
        
        done();
      });
    });
  });
});