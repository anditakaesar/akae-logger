import express from 'express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'
import helper from './helper'

import logger from './helper/logger'
import CST from './constants'
import routes from './routers'

// initialize express
const app = express()

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
app.use(CST.ROUTE.API.record, routes.record)

app.get('/', (req, res) => {
  res.json({
    message: 'Ok'
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