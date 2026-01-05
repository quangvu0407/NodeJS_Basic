import { StatusCodes } from 'http-status-codes'
import { authService } from '~/services/authService'

const createNewAccount = async (req, res, next) => {
  try {
    const createAccount = await authService.createNewAccount(req.body)
    res.status(StatusCodes.CREATED).json(createAccount)
  }
  catch (error) {
    next(error)
  }
}

const login = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    const { username, password } = req.body

    const account = await authService.login({ username, password })

    //co ket qua thi tra ve client
    res.status(StatusCodes.OK).json(account)
  }
  catch (error) { next(error) }
}

export const authController = {
  createNewAccount, login
}