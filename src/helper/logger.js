import winston, { format } from 'winston'
import moment from 'moment'
import env from '../env'
import { FORMATS } from '../constants'
import _ from 'lodash'

const formatDate = require('date-format')
const { combine, timestamp, label, printf } = format
const arrExcluded = ['timestamp', 'label', 'level', 'message']

const myFormat = printf((info) => {
  const metas = []
  Object.keys(info).forEach((e) => {
    let value = ''
    if (!_.includes(arrExcluded, e)) {
      value = info[e]
      if (value !== '' && value !== undefined) {
        metas.push(`${e}:${value}`)
      }
    }
  })

  if (info.intmsg !== undefined) {
    metas.push(info.intmsg)
  }

  if (info.request !== undefined) {
    metas.push(`req:${info.request}`)
  }

  const tmp = moment(info.timestamp).local().format(FORMATS.TIME_FORMAT)
  let strmetas = ''
  if (metas.length > 0) {
    strmetas += '\n\t'
    strmetas += metas.join('\n\t')
  }

  return `${tmp} ${info.level.toUpperCase()} [${info.label}] ${info.message}${strmetas}`
})

const dateStr = formatDate(FORMATS.DATE_FORMAT, new Date())
const logLevel = env.NODE_ENV.includes('develop') ? 'debug' : 'info'

const fileConfig = {
  filename: `./logs/log.${dateStr}.txt`,
  level: logLevel,
  format: combine(
    label({ label: env.NODE_ENV.toUpperCase() }),
    timestamp(),
    myFormat,
  ),
}

const consoleConfig = {
  level: logLevel,
  format: combine(
    label({ label: 'DEVELOP' }),
    timestamp(),
    myFormat,
  ),
}

function createNewLogger() {
  return new winston.createLogger({
    transports: [
      new winston.transports.Console(consoleConfig),
      new winston.transports.File(fileConfig),
    ],
  })
}

const logger = createNewLogger()
export default logger