const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')

// connecting to MongoDb
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.connect(MONGOURI)

mongoose.connection.on('connected', ()=>{
    console.log("Connected to MongoDB")
})

mongoose.connect(MONGOURI)
mongoose.connection.on('error', ()=>{
    console.log("Error occured when attempting to connect to MongoDB")
})

require('./models/user')
require('./models/post')
// pass in json, require route
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))

app.listen(PORT, () => {
    console.log("Server is running on", PORT)
})