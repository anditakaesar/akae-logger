import { Router } from 'express'
import helper from '../helper'
import moment from 'moment'

const router = Router()
const { Record } = helper.db

router.post('/', (req, res, next) => {
  process.nextTick(() => {
    const now = moment()
    const newRecord = {
    record: req.body,
      createdAt: now,
      updatedAt: now,
    }
    Record.create(newRecord)
      .then((r) => {
        res.status(201).json({
          message: 'Ok',
        })
      })
      .catch((err) => {
        next(err)
      })
  })

})

router.get('/:id', (req, res, next) => {
  process.nextTick(() => {
    Record.findOne({
      where: {
        id: req.params.id,
      }
    })
    .then((doc) => {
      if (!doc) {
        throw Error('not found')
      } else {
        res.json({
          message: 'Data Found',
          doc,
        })
      }
    })
    .catch((err) => {
      next(err)
    })
  })
})

export default router