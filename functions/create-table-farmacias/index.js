const axios = require('axios')
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({ region: 'us-east-2' })

exports.handler = async (event, contest) => {
  const params = {
    AttributeDefinitions: [
      {
        AttributeName: 'local_id',
        AttributeType: 'S'
      }
    ],
    KeySchema: [
      {
        AttributeName: 'local_id',
        KeyType: 'HASH'
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 5,
      WriteCapacityUnits: 5
    },
    TableName: 'farmacias'
  }

  try {
    const data = await dynamodb.createTable(params).promise()
    return {
      statusCode: 200,
      body: {
        msg: `Table ${params.TableName} successfully created`,
        data
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
