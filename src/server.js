/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import express from 'express'
import exitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from '~/config/environment'
import { APIs_V1 } from '~/routes/v1'
import { errorHandlingMiddleware } from '~/middlewares/errorHandlingMiddleware'

const START_SERVER = () => {
  const app = express()

  //bật req.body json data
  app.use(express.json())
  //use api v1
  app.use('/v1', APIs_V1)

  //Middleware xử lý lỗi tập trung
  app.use(errorHandlingMiddleware)
  app.listen(env.APP_PORT, env.APP_HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Hello ${env.AUTHOR}, I am running at https:// ${env.APP_HOST}:${env.APP_PORT}/`)
  })

  exitHook(() => {
    console.log('check')
    CLOSE_DB()
    console.log('close')
  })
}

(async () => {
  try {
    // eslint-disable-next-line no-console
    console.log('1. Connecting to MongoDB Cloud Atlas...')
    await CONNECT_DB()
    // eslint-disable-next-line no-console
    console.log('2. Connected to MongoDB Cloud Atlas')
    START_SERVER()
  }
  catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
    process.exit(0)
  }
})()

// nếu kết nối được thì mới start server
// console.log('1. Connecting to MongoDB Cloud Atlas...')
// CONNECT_DB()
//   .then(() => console.log('2. Connected to MongoDB Cloud Atlas')
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })