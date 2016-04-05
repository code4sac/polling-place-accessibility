import test from 'tape'
import has from 'lodash.has'
import access from '../src/actions/fetchAccessibilityObject.js'

test('Fetch valid accessibility data', function(t){
  t.plan(3);
  access(9999).catch(t.ok)
  access(2135).then(function(res){
    t.ok(has(res, `2135.sec_1.qid_12`));
    t.notOk(has(res['2135'], null));
  })
});
