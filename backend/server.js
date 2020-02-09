const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const schedule = require('node-schedule')
const request = require('request')

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

// schedule calls
const generateTimingRules = query => {
    const rule = new schedule.RecurrenceRule()

    // TODO: Map query.queryInterval into correct rule attrs here
    rule.second = [0, 10, 20, 30, 40, 50]

    return rule
}

const generateQueryFunction = query => () => {
    // TODO: Map query.queryTerms into correct ebay api calls here
    // this is also where push notification logic would live
    console.log(query.queryTerms)
}

const scheduleQuery = query => {
    schedule.scheduleJob(generateTimingRules(query), generateQueryFunction(query))
}

request('http://localhost:5000/api/queries', {json: true}, (err, res, queries) => {
    if (err) {
        return console.log(err)
    }
    queries.forEach(scheduleQuery)
})
