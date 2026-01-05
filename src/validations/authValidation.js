import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { GET_DB } from '~/config/mongodb'

const ACCOUNT_COLLECTION_NAME = 'account'
const createNewAccount = async (req, res, next) => {
  const correctCondition = Joi.object({
    email: Joi.string().required().min(15).max(50).trim().strict().messages({
      'any.required': 'Email is required.',
      'string.empty': 'Email is not allowed to be empty.',
      'string.min': 'Email min 15 chars.',
      'string.max': 'Email max 50 chars',
      'string.trim': 'Email must not have leading or training whitespace.'
    }),
    username: Joi.string().required().min(6).max(50).trim().strict().messages({
      'any.required': 'Name is required.',
      'string.empty': 'Name is not allowed to be empty.',
      'string.min': 'Name min 5 chars.',
      'string.max': 'Name max 50 chars',
      'string.trim': 'Name must not have leading or training whitespace.'
    }),
    password: Joi.string().required().min(6).max(50).trim().strict().messages({
      'any.required': 'Pass is required.',
      'string.empty': 'Pass is not allowed to be empty.',
      'string.min': 'Pass min 5 chars.',
      'string.max': 'Pass max 50 chars',
      'string.trim': 'Pass must not have leading or training whitespace.'
    })
  })

  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    const checkAccount = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOne({
      username: req.body.username
    })
    if (checkAccount) {
      return next(
        new ApiError(
          StatusCodes.CONFLICT,
          'Username already exists'
        )
      )
    }
    next()
  }
  catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

const login = async (req, res, next) => {
  const correctAccount = Joi.object({
    username: Joi.string().required().min(6).max(50).trim().strict().messages({
      'any.required': 'Name is required.',
      'string.empty': 'Name is not allowed to be empty.',
      'string.min': 'Name min 5 chars.',
      'string.max': 'Name max 50 chars',
      'string.trim': 'Name must not have leading or training whitespace.'
    }),
    password: Joi.string().required().min(6).max(50).trim().strict().messages({
      'any.required': 'Pass is required.',
      'string.empty': 'Pass is not allowed to be empty.',
      'string.min': 'Pass min 5 chars.',
      'string.max': 'Pass max 50 chars',
      'string.trim': 'Pass must not have leading or training whitespace.'
    })
  })

  try {
    await correctAccount.validateAsync(req.body, { abortEarly: false })
    next()
  }
  catch (error) {
    const errorMessage = new Error(error).message
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage))
  }
}

export const authValidation = {
  createNewAccount, login
}