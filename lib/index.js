var annotate = require('annotate');
var is = require('annois');


var zip = annotate('zip', 'Converts given input into a zip').
    on(is.array, is.array, function(a, b) {
        console.log('should zip now', a, b);

        return [[], []];
    }).
    on(is.object, function(o) {
        return [[], []];
    }).
    satisfies(function(ret) {
        return is.array(ret) && ret.length == 2;
    });

module.exports = zip;
