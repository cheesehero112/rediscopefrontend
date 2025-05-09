const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
const redisRouter = require('./routes/redisRoutes')
const userRouter = require('./routes/userRoutes')
const urlRouter = require('./routes/urlRoutes')

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())
app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../build/')))

app.use('/api/users', userRouter)
app.use('/api/redis', redisRouter)
app.use('/api/url', urlRouter)

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  }
  const errorObj = Object.assign({}, defaultErr, err)
  return res.status(errorObj.status).json(errorObj.message)
})

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/'))
})

// START SERVER
app.listen(4000, console.log('server listening on port 4000'))