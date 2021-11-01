const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.use('/api/auth', cors(), require('./routes/auth.routes'))

const PORT = config.get('port') || 5000

async function start () {
    try {
       await mongoose.connect(config.get('mongoUri'), {
           useNewUrlParser: true,
           useUnifiedTopology: true,

       })
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}`))
    } catch (error) {
        console.log ('server error', error.message)
        process.exit(1)
    }
}
start()


