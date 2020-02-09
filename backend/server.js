const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

// connect to db via mongoose
const uri = process.env.ATLAS_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
})

const connection = mongoose.connection
connection.once('open', () => {
    console.log('MongoDB database connection established successfully')
})

// register routes
const queriesRouter = require('./routes/queries')
const usersRouter = require('./routes/users')

app.use('/api/queries', queriesRouter)
app.use('/api/users', usersRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
})
