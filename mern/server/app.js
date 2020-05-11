const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
const { MONGOURI } = require('./config/keys')

// connecting to MongoDb
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(MONGOURI)

mongoose.connection.on('connected', () => {
    console.log("Connected to MongoDB")
})

mongoose.connect(MONGOURI)
mongoose.connection.on('error', () => {
    console.log("Error occured when attempting to connect to MongoDB")
})

require('./models/user')
require('./models/post')
// pass in json, require route
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

if (process.env.NODE_ENV == "production") {
    app.use(express.static('client/build'))
    const path = require('path')
    // any request, send to directory, client, build, then index.html
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})