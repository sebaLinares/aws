const axios = require('axios')
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' })

exports.handler = async (e, ctx) => {
  const scanningParameters = {
    TableName: 'farmacias',
    Limit: 400
  }

  try {
    const data = await docClient.scan(scanningParameters).promise()
    return {
      statusCode: 200,
      body: {
        msg: 'Read successfully',
        data
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
