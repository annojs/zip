var generate = require('annogenerate');

generate.isZip = function() {
    return zip(generate.array(), generate.array());
};

var fuzz = require('annofuzz')(generate);
var funkit = require('funkit');
var equals = funkit.ops.equals;

var zip = require('../');


fuzz._amount = 100;
fuzz(zip.toObject, function(op, a) {
    var res = op(a);
    return a.filter(function(v) {
        return equals(res[v[0]], v[1]);
    }).length == a.length;
});
