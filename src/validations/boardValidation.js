/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
// import { json } from 'express'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required.',
      'string.empty': 'Title is not allowed to be empty.',
      'string.min': 'Title min 3 chars.',
      'string.max': 'Title max 50 chars',
      'string.trim': 'Title must not have leading or training whitespace.'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })

  try {
    //Trả về nhiều lỗi(cho abortEarly: false), nếu k set thì chỉ lấy lỗi đầu tiên phát hiện
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // cho  request đi tiếp san controller
    next()
  }
  catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const boardValidation = {
  createNew
}