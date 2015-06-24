var _ = require('lodash');
var rest = require('restling');
var Promise = require('bluebird');

module.exports.getOffers = function (advertiser) {
  var url = buildUrl(advertiser.ca_api_url, advertiser.ca_api_id, advertiser.ca_api_token, 1);

  return rest.get(url).then(function (res) {
    return new Promise(function (resolve, reject) {
      resolve(_.reduce(res.data.data.data, function (result, val, key) {
        result.push({
          io_id: key,
          io_app_name: /.+?(?=-|$)/.exec(val.name)[0].trim(),
        });
        
        return result;
      }, []));
    });
  });
};

function buildUrl(url, apiId, token, page) {
  return url + '?api_id=' + apiId + '&api_token=' + token + '&limit=10&page=' + page;
}