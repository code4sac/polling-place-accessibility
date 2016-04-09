import test from 'tape'
import has from 'lodash.has'
import access from '../src/actions/fetchAccessibilityObject.js'

test('Fetch valid accessibility data', function(t){
  t.plan(4);
  access(9999).catch(function(err){
    t.ok(err, 'Expect non-existant ppid to be rejected.');
  })
  access(2135).then(function(res){
    t.ok(has(res, `2135.sec_1.qid_12`), 'Expect parking question twelve.');
    t.notOk(has(res['2135'], null), 'No null sections.');
  })
  access(3414).then(function(res){
    t.comment('3414: ' + JSON.stringify(res).substr(0,1800))
    t.ok(res);
  });
});
