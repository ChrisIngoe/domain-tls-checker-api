'use strict';

const axios = require('axios'),
  request = require('request');

exports.checkTls = function (req, res) {
  const domain = req.params.domain;
  checkDomain2(domain, function(err, data){
    if (err){
      return res.status(500).send('Internal server error');
    } else {
      return res.status(200).json( data );
    }   
  });
};

function checkDomain(domain, callback) {
  axios.get("https://www.google.com/")
  .then(res => {
    console.log(res.socket.getProtocol());
    return res.JSON();
  })
  .then(json => {
    console.log(json);
    return callback(null, json);
  })
  .catch(err => {
    console.log(err);
    return callback(err);
  })
};

function checkDomain2(domain, callback){
  request.get(`https://${domain}`, function(err, res, body){
    if (err){
      console.log(err);
      return callback(err);
    } else if (!res || !res.socket){
      console.log('unknown response');
      return callback('Unknown response');
    } else {
      console.log(res.socket.getProtocol());
      return callback(null, res.socket.getProtocol());
      }
  });
}
