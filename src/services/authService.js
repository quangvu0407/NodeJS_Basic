import { StatusCodes } from 'http-status-codes'
import { authModel } from '~/models/authModel'
import ApiError from '~/utils/ApiError'

const createNewAccount = async (reqbody) => {
  try {
    const newAccount = {
      ...reqbody
    }
    const createdAccount = await authModel.createNewAccount(newAccount)
    const getNewAccount = await authModel.findOneById(createdAccount.insertedId)

    return getNewAccount
  }
  catch (error) {
    throw (error)
  }
}

const login = async ({ username, password }) => {
  try {
    const account = await authModel.findOneByNameAndPassword({ username, password })
    if (!account) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, 'Invalid username or password')
    }
    return account
  }
  catch (error) {
    throw error
  }
}

export const authService = {
  createNewAccount, login
}