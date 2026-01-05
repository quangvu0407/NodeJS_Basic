/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRouter } from './BoardRouter'
import { columnRouter } from './columnRouter'
import { cardRouter } from './cardRouter'
import { authRouter } from './authRouter'

const Router = express.Router()

// check APIs v1 status
Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 are ready to use.' })
})

/** Auth */
Router.use('/auth', authRouter)

/** Board APIs */
Router.use('/boards', boardRouter)

/** Column APIs */
Router.use('/columns', columnRouter)

/** Card APIs */
Router.use('/cards', cardRouter)


export const APIs_V1 = Router