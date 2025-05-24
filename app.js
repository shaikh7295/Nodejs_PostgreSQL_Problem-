const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const app = express()
const router = require('./src/router/route')
app.use('/', router)
const port = process.env.PORT

app.use(bodyParser.json())

app.listen(port, () => {
    console.log(`Application Running on port ${port}`);

})



