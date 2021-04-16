import express from 'express'
import { json, urlencoded } from 'body-parser'
import compression from 'compression'
import helmet from 'helmet'

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