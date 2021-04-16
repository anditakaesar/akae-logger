import express from 'express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import helper from './helper'
import moment from 'moment'
import logger from './logger'

// initialize express
const app = express()
const { Record } = helper.db

// middleware
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(compression())
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
)
// app.use(cors())

// routers
app.get('/', (req, res) => {
  res.json({
    message: 'Ok'
  })
})

app.post('/', (req, res, next) => {

  process.nextTick(() => {
    const now = moment()
    const newRecord = {
      record: {
        message: 'this',
      },
      createdAt: now,
      updatedAt: now,
    }

    Record.create(newRecord)
      .then((r) => {
        res.json({
          message: 'New Record saved'
        })
      })
      .catch((err) => {
        next(err)
      })
  })
})

// error handling
app.use((err, req, res, next) => {
  // log ?
  if (err) {
    res.json({
      message: err.message,
    })
  } else {
    next()
  }
})

export default app