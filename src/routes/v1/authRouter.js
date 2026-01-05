import express from 'express'
// import { StatusCodes } from 'http-status-codes'
import { authValidation } from '~/validations/authValidation'
import { authController } from '~/controllers/authController'


const Router = express.Router()

Router.route('/register')
  .post(authValidation.createNewAccount, authController.createNewAccount)

Router.route('/login')
  .post(authValidation.login, authController.login)


export const authRouter = Router