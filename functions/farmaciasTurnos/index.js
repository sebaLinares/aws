const axios = require('axios')
const AWS = require('aws-sdk')
const docClient = new AWS.DynamoDB.DocumentClient({ region: 'us-east-2' })

console.log('Function starting...')
exports.handler = async (e, ctx) => {
  const farmaciasTurnosURL =
    'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesturnos'
  const farmaciasUrgenciaURL =
    'https://farmanet.minsal.cl/maps/index.php/ws/getLocalesUrgencia'

  // Delete elements witih '' value
  const deleteEmpty = obj => {
    for (let prop in obj) {
      if (obj[prop] === '') {
        delete obj[prop]
      }
    }
    return obj
  }

  // http request
  try {
    // GET night shift & urgency drugstores arrays from MINSAL website
    const farmaciasTurnos = await axios.get(farmaciasTurnosURL)
    const farmaciasEmergencia = await axios.get(farmaciasUrgenciaURL)

    // Delete every '' element from every individual object in response
    const newFarmaciasTurnos = farmaciasTurnos.data.map(deleteEmpty)
    const newFarmaciasEmergencia = farmaciasEmergencia.data.map(deleteEmpty)
    const farmaciasTodas = [...newFarmaciasTurnos, ...newFarmaciasEmergencia]

    // The obj that has to go to DynamoDB table
    for (let farmacia of farmaciasTodas) {
      const params = {
        Item: {
          ...farmacia
        },
        TableName: 'farmacias'
      }

      // Add document to table.
      const data = await docClient.put(params).promise()
    }

    return {
      statusCode: 200,
      body: {
        msg: `${
          farmaciasTodas.length
        } drugstores added to DynamoDB('farmacias')`
      }
    }
  } catch (err) {
    throw new Error(err)
  }
}
