const express = require('express')
const app = express()
const axios = require('axios')

const PORT = 3000
const URL_FARMACIAS = 'https://49bgz54952.execute-api.us-east-2.amazonaws.com/prod/farmacias-turno'

app.get('/', (req, res) => {
  try {
    res.send('Test server para AWS').status(200)
  } catch(err) {
    res.status(500).json({err})
  }
})

app.get('/farmacias', async (req, res) => {
  try {
    console.log('trying farmacias')

    const resp = await axios.get(URL_FARMACIAS)
    const farmacias = resp.data.body.data.Items
    // farmacias length
    console.log(farmacias.length)


    res.status(200)
  } catch(err) {
    console.log('catched error: ', err)
    res.status(500).json({err: err})
  }
})


app.listen('3000', () => {
  console.log(`We are live in port ${PORT}`)
})
