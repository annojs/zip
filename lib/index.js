var annotate = require('annotate');
var is = require('annois');
var funkit = require('funkit');
var keys = funkit.object.keys;
var values = funkit.object.values;


var zip = annotate('zip', 'Converts given input into a zip').
    on(is.array, is.array, function(a, b) {
        var ret = [];
        var i, len;

        for(i = 0, len = Math.min(a.length, b.length); i < len; i++) {
            ret.push([a[i], b[i]]);
        }

        return ret;
    }).
    on(is.object, function(o) {
        return zip(keys(o), values(o));
    }).
    satisfies(isZip);

var toObject = annotate('zip.toObject', 'Converts given zip into an object').
    on(isZip, function(a) {
        var ret = {};
        var i, len;

        a.forEach(function(v) {
            ret[v[0]] = v[1];
        });

        return ret;
    }).
    satisfies(is.object);

zip.toObject = toObject;

function isZip(a) {
    var zips = a.filter(function(v) {
        return is.array(v);
    });

    return is.array(a) && zips.length == a.length;
}

module.exports = zip;
