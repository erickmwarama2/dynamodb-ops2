const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.get(
//   {
//     TableName: "td_notes_sdk",
//     Key: {
//       user_id: "ABC",
//       timestamp: 5,
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.query(
//   {
//     TableName: "td_notes_sdk",
//     KeyConditionExpression: "user_id = :uid",
//     ExpressionAttributeValues: {
//       ":uid": "ABC",
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.scan(
//   {
//     TableName: "td_notes_sdk",
//     FilterExpression: 'content = :content',
//     ExpressionAttributeValues: {
//         ':content': 'Initial Content'
//     }
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

docClient.batchGet({
    RequestItems: {
        'td_notes_sdk': {
            Keys: [
                {
                    user_id: 'ABC',
                    timestamp: 1
                },
                {
                    user_id: 'ABC',
                    timestamp: 5
                }
            ]
        },
        'td_notes': {
            Keys: [
                {
                    user_id: 'c8a1e106-855a-4b4d-b0e7-1e9af8577d6a',
                    timestamp: 1769472000
                }
            ]
        }
    }
},
(err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(JSON.stringify(data, null, 2));
    }
  }
)
