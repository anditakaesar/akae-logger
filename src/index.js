import 'dotenv/config'
import app from './app'
import env from './env'
import helper from './helper'

const { logger } = helper

app.listen(env.PORT, () => {
  logger.info(`app start at port ${env.PORT}`, env)
})