var generate = require('annogenerate');
var fuzz = require('annofuzz')(generate);
var is = require('annois');
var funkit = require('funkit');
var equals = funkit.ops.equals;
var keys = funkit.object.keys;
var values = funkit.object.values;

var zip = require('../');


fuzz._amount = 100;
fuzz(zip, function(op, a, b) {
    var res, matches;

    if(!is.defined(b)) {
        a = keys(a);
        b = values(a);
    }

    res = op(a, b);

    matches = res.filter(function(v, i) {
        return equals(v[0], a[i]) && equals(v[1], b[i]);
    });

    return matches.length == res.length;
});
