'use strict';

var annotate = require('annotate');
var is = require('annois');
var fp = require('annofp');
var prop = fp.prop;
var keys = fp.keys;
var values = fp.values;


var zip = annotate('zip', 'Converts given input into a zip').
    on([is.array], function() {
        var ret = [];
        var args = Array.prototype.slice.call(arguments);
        var i, len;

        for(i = 0, len = Math.min.apply(null, args.map(prop('length'))); i < len; i++) {
            ret.push(extract(i, args));
        }

        return ret;
    }).
    on(is.object, function(o) {
        return zip(keys(o), values(o));
    }).
    satisfies(isZip);

function extract(idx, arrays) {
    var ret = [];
    var i, len;

    for(i = 0, len = arrays.length; i < len; i++) {
        ret.push(arrays[i][idx]);
    }

    return ret;
}

var toObject = annotate('zip.toObject', 'Converts given zip into an object').
    on(isZip, function(a) {
        var ret = {};

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

    return is.array(a) && zips.length === a.length;
}

module.exports = zip;
