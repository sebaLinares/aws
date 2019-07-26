const axios = require('axios')
const AWS = require('aws-sdk')
const dynamodb = new AWS.DynamoDB({ region: 'us-east-2' })

exports.handler = async (e, ctx) => {
  const params = {
    TableName: 'farmacias'
  }

  try {
    const data = await dynamodb.deleteTable(params).promise()
    return {
      statusCode: 200,
      body: {
        msg: `Table ${params.TableName} succesfully deleted`
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
