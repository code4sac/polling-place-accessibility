import test from 'tape'
import access from '../src/actions/fetchAccessibilityObject.js'
import paths from '../src/actions/stories/paths.js'

test('Path stories', function(t){
  t.plan(2);
  access(15)
  .then(function(res){
    var story = paths(res['15']);
    t.equals(story.summary, 'There is a path from Parking and a path from Property line.', 'Correct paths summary for ppid 15');
    t.equals(story.warnings.length, 0, 'Expects no paths warnings for ppid 15');
  })
});
