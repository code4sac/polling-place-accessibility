var and = require('join-component');

var paths = function(pollingPlace) {
  var response = { summary: 'There are no surveyed paths.', warnings: [] };
  
  var parking = pollingPlace['Path of Travel']['1-Parking'];
  var pubTransit = pollingPlace['Path of Travel']['2-Public-Transportation'];
  var dropOff = pollingPlace['Path of Travel']['3-Drop-Off-Zone'];
  var propertyLine = pollingPlace['Path of Travel']['4-Property-Line'];
  var other = pollingPlace['Path of Travel']['5-Other'];
  var subCategories = [parking, pubTransit, dropOff, propertyLine, other];
  var andPaths = [];
  var noPaths = true;
  var pathsWithSteps = [];
  
  subCategories.forEach( (val) => {
    if (val.qid_0.answer) andPaths.push('a path ' + val.qid_0.answer);
  });
  
  if (andPaths.length > 0) {
    noPaths = false;
    response.summary = 'There is ' + and(andPaths) + '.';
  }
  
  //Steps warnings
  subCategories.forEach( (sub) => {
    if (sub.qid_1.answer === 'No') pathsWithSteps.push('the path ' + sub.qid_0.answer);
  });
  if (pathsWithSteps.length > 0) response.warnings.push('There are stairs on ' + and(pathsWithSteps) + '.');
  
  return response;
};

module.exports = paths;
