const request = require('request');

module.exports = function(callback) {
    request('http://localhost:3000/api/students', {json: true}, function (err, res, body) {
        if (err) {
            return console.log(err);
        }
        console.log(body);
        return body;
    });
};

