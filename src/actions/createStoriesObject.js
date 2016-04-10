import parking from './stories/parking.js'

var createStoriesObject = function(pollingPlace) {
  var result = {};
  result.Parking = parking(pollingPlace);
  result.Info = {
    ppid: pollingPlace['sec_0']['qid_1'].answer,
    name: pollingPlace['sec_0']['qid_2'].answer,
    address: pollingPlace['sec_0']['qid_3'].answer
  }
  return result;
};

export default createStoriesObject
