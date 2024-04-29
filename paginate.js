const _ = require("underscore");
const async = require("async");
const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});

const docClient = new AWS.DynamoDB.DocumentClient();

let startKey = [];
let results = [];
let pages = 0;

// async.doWhilst(
//     (callback) => {
//         console.log('fetching data...');
//         let params = {
//             TableName: 'td_notes_sdk',
//             Limit: 1,
//         };

//         if (!_.isEmpty(startKey)) {
//             params.ExclusiveStartKey = startKey;
//         }

//         docClient.scan(params, (err, data) => {
//             if (err) {
//                 console.log(err);
//                 callback(err, {});
//             } else {
//                 if (typeof data.LastEvaluatedKey !== 'undefined') {
//                     startKey = data.LastEvaluatedKey;
//                 } else {
//                     startKey = [];
//                 }

//                 console.log('fetched data', data);
//                 if (!_.isEmpty(data.Items)) {
//                     results = _.union(results, data.Items);
//                 }

//                 pages++;

//                 callback(null, results);
//             }
//         })
//     },
//     () => {
//         if (_.isEmpty(startKey)) {
//             return false;
//         } else {
//             return true;
//         }
//     },
//     (err, data) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(data);
//             console.log("Item count: ", data.length);
//             console.log("Pages: ", pages);
//         }
//     }
// );

// do {
//   let params = {
//     TableName: "td_notes_sdk",
//     Limit: 1,
//   };
//   docClient
//     .scan(params)
//     .promise()
//     .then((data) => {
//       if (typeof data.LastEvaluatedKey !== "undefined") {
//         startKey = data.LastEvaluatedKey;
//       } else {
//         startKey = [];
//       }

//       console.log("fetched data", data);
//       if (!_.isEmpty(data.Items)) {
//         results = _.union(results, data.Items);
//       }

//       pages++;
//     })
//     .catch((err) => {
//       console.log(err);
//       throw err;
//     });
// } while (!_.isEmpty(startKey));

console.log(results);
console.log("Item count: ", results.length);
console.log("Pages: ", pages);

async function paginate() {
  let startKey = [];
  let results = [];
  let pages = 0;

  do {
    try {
      let params = {
        TableName: "td_notes_sdk",
        Limit: 1,
      };

      if (!_.isEmpty(startKey)) {
        params.ExclusiveStartKey = startKey;
      }

      const data = await docClient.scan(params).promise();

      if (typeof data.LastEvaluatedKey !== "undefined") {
        startKey = data.LastEvaluatedKey;
      } else {
        startKey = [];
      }

      if (!_.isEmpty(data.Items)) {
        results = _.union(results, data.Items);
      }

      pages++;
    } catch (err) {
        console.log(err);
    }
  } while (!_.isEmpty(startKey));

  console.log("Results", results);
  console.log("Item count: ", results.length);
  console.log("Pages: ", pages);
}

paginate();
