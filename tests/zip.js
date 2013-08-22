var generate = require('annogenerate');
var fuzz = require('annofuzz')(generate);
var is = require('annois');
var equals = require('funkit').ops.equals;

var zip = require('../');


fuzz._amount = 100;
fuzz(zip, function(op, a, b) {
    var res = op(a, b);
    var matches;

    if(b) {
        matches = res.filter(function(v, i) {
            return equals(v[0], a[i]) && equals(v[1], b[i]);
        });

        return matches.length == res.length;
    }
    // TODO: test object case

    return true;
});
