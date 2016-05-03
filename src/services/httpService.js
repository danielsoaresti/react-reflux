var Fetch = require('whatwg-fetch');
var baseUrl = 'http://localhost:6060';

var service = {
    get: function (url) {
        return fetch(baseUrl + url).then(function (response) {
            return response.json();
        });        
    },
    post: function (url, ingredient) {
        return fetch(baseUrl + url, {
            headers: {
                'Accept': 'text/plain',
                'Content-type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(ingredient)
        }).then(function (response) {
            return response;
        });        
    }
};

module.exports = service;