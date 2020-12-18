'use strict';

const request = require('request');

exports.checkTlsByRequest = function (domainCheck) {
    return new Promise((resolve) => {
        if (domainCheck.result !== '' && domainCheck.result !== 'Unknown'){
            return resolve(domainCheck);
        } else {
            request.get(`https://${domainCheck.domain}`, function(err, res){
                if (err){
                    console.log(err);
                    domainCheck.result = 'Not Tls';
                    return resolve(domainCheck);
                } else if (!res || !res.socket){
                    console.log('unknown response');
                    domainCheck.result = 'Not Tls';
                    return resolve(domainCheck);
                } else {
                    domainCheck.result = res.socket.getProtocol();
                    console.log(domainCheck.result);
                    return resolve(domainCheck);
                }
            });
            }
    });
}
