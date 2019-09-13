const express = require('express')
const app = express()
const axios = require('axios')

const PORT = 3000

app.get('/', (req, res) => {
  try {
    res.send('Test server para AWS').status(200)
  } catch(err) {
    res.status(500).json({err})
  }
})

app.get('/farmacias', (req, res) => {
  try {
    res.send('Endpoint para farmacias').status(200)
  } catch(err) {
    res.status(500).json({err})
  }
})


app.listen('3000', () => {
  console.log(`We are live in port ${PORT}`)
})
