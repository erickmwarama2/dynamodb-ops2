const AWS = require("aws-sdk");
AWS.config.update({
  region: "us-east-2",
});

const docClient = new AWS.DynamoDB.DocumentClient();

docClient.put({
    TableName: 'td_notes_sdk',
    Item: {
        user_id: 'bb',
        timestamp: 1714372358578,
        title: 'Updated item from sdk',
        content: 'Updated item content from sdk'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

docClient.update({
    TableName: 'td_notes_sdk',
    Key: {
        user_id: 'bb',
        timestamp: 1714372311647
    },
    UpdateExpression: 'set #t = :t',
    ExpressionAttributeNames: {
        '#t': 'title'
    },
    ExpressionAttributeValues: {
        ':t': 'The updated title'
    }
}, (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
});

docClient.delete(
  {
    TableName: "td_notes_sdk",
    Key: {
      user_id: "bb",
      timestamp: 1714372311647,
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);

docClient.batchWrite(
  {
    RequestItems: {
      td_notes_sdk: [
        {
          DeleteRequest: {
            Key: {
              user_id: "bb",
              timestamp: 1714372358578,
            },
          },
        },
        {
          PutRequest: {
            Item: {
              user_id: "erick001",
              timestamp: new Date().getTime(),
              title: "Batch put title",
              content: "This is a batch write request",
            },
          },
        },
      ],
    },
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  }
);
