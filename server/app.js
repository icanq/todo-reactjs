if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const router = require('./routes')
const mongoose = require('mongoose')
const errorHandler = require('./middlewares/errorHandler')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
const connection = mongoose.connection
connection.once('open', () => {
  console.log("💻 Mongodb Connected");
})
app.use(router)
app.use(errorHandler)

module.exports = app

