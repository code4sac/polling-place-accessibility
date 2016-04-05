var request = require('superagent');
var set = require('lodash.set');
var has = require('lodash.has');

var access = function(ppid) {
  'use strict';
  let p = new Promise(function(resolve, reject){
    //console.time('access-request');
    request
      .get('http://saccounty.cloudapi.junar.com/api/v2/datastreams/VRE-DENOR-FULL-LIST/data.json/')
      .query({auth_key:'e66e1b3017d7dec9e8e451c5aaaded1545363ddc'})
      .query({filter0:'column0[==]' + ppid})
      //.query({filter1:'column2[contains]restrooms'})
      //.query({where: '(filter0 and filter1)'})
      .query({where:'(filter0)'})
      .end(function(err, res){
        //console.timeEnd('access-request');
        if (err || !res.ok) {
          reject(err);
        } else if(!has(res, 'body.result.fArray')) {
          reject(res);
        } else {
          //console.time('access-parse-object');
          var result = [];
          let columns = ['ppid', 'section', 'category', 'subcategory', 'qid', 'question', 'answer', 'data', 'comments'];
          res.body.result.fArray.forEach(function(val, ind, arr){
            if (ind%9 === 0) result.push({});
            result[result.length-1][columns[ind%9]] = val.fStr;
          });
          var groupedResults = {};
          var ppStr = ppid.toString();
          groupedResults[ppid.toString()] = {};
          result.forEach(function(val, ind, arr){
            set(groupedResults[ppStr], `['sec_${val.section}']['qid_${val.qid}'].question`, val.question);
            set(groupedResults[ppStr], `['sec_${val.section}']['qid_${val.qid}'].answer`, val.answer);
            set(groupedResults[ppStr], `['sec_${val.section}']['qid_${val.qid}'].data`, val.data);
            set(groupedResults[ppStr], `['sec_${val.section}']['qid_${val.qid}'].comments`, val.comments);
          });
          //console.timeEnd('access-parse-object');
          resolve(groupedResults);
        }
      });
  });
  return p;
};

module.exports = access;
