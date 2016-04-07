import parking from './stories/parking.js'

var createStoriesObject = function(pollingPlace) {
  var result = {};
  result.Parking = parking(pollingPlace);
  return result;
};

export default createStoriesObject
