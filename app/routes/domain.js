'use strict';

const fileCheck = require('../services/domainCheckFile'),
  requestCheck = require('../services/domainCheckRequest');

exports.checkTls = function (req, res) {
  const checkDomain = { domain: req.params.domain, result: '' };
  checkDomainTls(checkDomain, function (err, data) {
    if (err) {
      //console.log(err);
      return res.status(500).send('Internal server error');
    } else {
      return res.status(200).json(data.result || 'Not Tls');
    }
  });
};

function checkDomainTls(checkDomain, callback) {
  fileCheck
    .checkTlsByList(checkDomain)
    .then(requestCheck.checkTlsByRequest)
    .then((checkDomain) => {
      //console.log(checkDomain);
      return callback(null, checkDomain);
    })
    .catch((err) => {
      return callback(err);
    });
}
