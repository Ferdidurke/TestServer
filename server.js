const express = require('express')
const config = require('config')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())


app.use('/api/todo', cors(), require('./routes/todo.routes'))
app.use('/api/logs', cors(), require('./routes/logs.routes'))
app.use('/api/auth', cors(), require('./routes/auth.routes'))
app.use('/api/blog', cors(), require('./routes/posts.routes'))
app.use('/api/blog', cors(), require('./routes/comments.routes'))


const PORT = process.env.PORT || 5000

async function start () {
    try {
       await mongoose.connect(config.get('mongoUri'), {
           useNewUrlParser: true,
           useUnifiedTopology: true,
       })
        app.listen(PORT, "0.0.0.0", () => console.log(`App has been started on port ${ PORT }`))
    } catch (error) {
        console.log ('server error', error.message)
        process.exit(1)
    }
}
start()


