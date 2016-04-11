module.exports = function(pollingPlace){

  for (var qid in pollingPlace['sec_4.0']) {
    if (!pollingPlace['sec_4.0'][qid].subcategory || pollingPlace['sec_4.0'][qid].subcategory == '') {
      pollingPlace['sec_4'][qid] = pollingPlace['sec_4.0'][qid];
      delete pollingPlace['sec_4.0'][qid];
    }
  }

  var site = pollingPlace;
  var votingArea = site.sec_4;
  var response = { summary: 'No voting area details.', warnings: new Set() };

  var stablePath = ( votingArea.qid_1.answer === 'Yes' ) ? true : false;
  var protusionsLT4in = ( votingArea.qid_2.answer === 'Yes' ) ? true : false;
  var protusionsLT12in = ( votingArea.qid_3.answer === 'Yes' ) ? true : false;
  var overheadObstaclesBarred = ( votingArea.qid_4.answer === 'Yes' ) ? true : false;
  var wheelchairSpace = ( votingArea.qid_5.answer === 'Yes' ) ? true : false;
  var easyEmergencyExit = ( votingArea.qid_6.answer === 'Yes' ) ? true : false;
  var crossSlopeOK = ( votingArea.qid_7.answer === 'Yes' ) ? true : false;
  var slopeChangesBeveled = ( votingArea.qid_8.answer === 'Yes' ) ? true : false;
  var levelChangesSloped = ( votingArea.qid_9.answer === 'Yes' ) ? true : false;
  var adequateLighting = ( votingArea.qid_10.answer === 'Yes' ) ? true : false;

  if ( ! stablePath ) {
    response.warnings.add ('Path of travel within the voting area may be slippery/unstable.');
  }

  if ( ! protusionsLT4in ) {
    response.warnings.add( 'Take care of obstacles 4" or less in the walkway.' );
  }

  if ( ! protusionsLT12in ) {
    response.warnings.add( 'Take care of obstacles 12" or less in the walkway.' );
  }

  if ( ! overheadObstaclesBarred ) {
    response.warnings.add( 'Take care of overhead obstacles.' );
  }

  if ( ! wheelchairSpace ) {
    response.warnings.add( 'Turning a wheelchair may be difficult in the voting area.' );
  }

  if ( ! easyEmergencyExit ) {
    response.warnings.add( 'Emergency exits may require grasping to open.' );
  }

  if ( ! crossSlopeOK || ! slopeChangesBeveled || ! levelChangesSloped ) {
    response.warnings.add( 'There may be unbeveled or highly sloped changes in the floor level.' );
  }

  if ( ! adequateLighting ) {
    response.warnings.add( 'Possibly dim lighting within the voting area.' );
  }

  if ( response.warnings.length > 0 ) {
    response.summary = 'The voting area has some accessibility concerns.';
  } else {
    response.summary = 'The voting area is fully accessible for all.';
  }

  response.warnings = Array.from(response.warnings);
  return response;
};
