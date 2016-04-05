import parking from './stories/parking.js'

var createStoriesObject = function(pollingPlace) {
  var result = {};
  result.parking = parking(pollingPlace);
  return result;
};

export default createStoriesObject
