'use strict';

const config = require('config'),
  domainList = config.get('domains');

exports.checkTlsByList = function (domainCheck) {
  return new Promise((resolve) => {
    if (domainCheck.result !== '' && domainCheck.result !== 'Unknown') {
      return resolve(domainCheck);
    } else if (domainList.includes(domainCheck.domain)) {
      domainCheck.result = 'Tls Ok';
      return resolve(domainCheck);
    } else {
      domainCheck.result = 'Unknown';
      return resolve(domainCheck);
    }
  });
};
