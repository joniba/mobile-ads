var _ = require('lodash');
var rest = require('restling');
var Promise = require('bluebird');

module.exports = function () {
  
  var self = {
    
    getOffers: function (advertiser) {
      var url = buildUrl(advertiser.ca_api_url, advertiser.ca_api_id, advertiser.ca_api_token, 1);
      
      return rest.get(url).then(function (res) {
        return new Promise(function (resolve, reject) {
          resolve(_.map(res.data.data.data, function (val, key) {
            return {
              io_external_offer_id: key,
              io_app_name: /.+?(?=-|$)/.exec(val.name)[0].trim(),
              io_ios_preview_url: val.preview_url,
              io_ios_bundle_id: getBundleId(val.preview_url),
              io_type: getType(val.preview_url),
              promotion: {
                country: val.countries[0],
                ip_revenue_amount: val.payout
              }
            };
          }));
        });
      });
    }
  };
  
  function getBundleId(previewUrl) {
    var id = /(?:id\=)(.+)/.exec(previewUrl);
    
    return id ? id[1] : '';
  }
  
  function getType(previewUrl) {
    return previewUrl.indexOf('itunes.apple.com') >= 0 ? 'mobile app' 
      : previewUrl.search(/apk|ddl/i) >= 0 ? 'APK' 
      : 'mobile web';
  }
  
  function buildUrl(url, apiId, token, page) {
    return url + '?api_id=' + apiId + '&api_token=' + token + '&limit=10&page=' + page;
  }
  
  return self;
};