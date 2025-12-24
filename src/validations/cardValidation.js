import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required.',
      'string.empty': 'Title is not allowed to be empty.',
      'string.min': 'Title min 3 chars.',
      'string.max': 'Title max 50 chars',
      'string.trim': 'Title must not have leading or training whitespace.'
    })
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

const updateCardTitle = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(50).trim().strict()
  })

  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false
    })
    // cho  request đi tiếp san controller
    next()
  }
  catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const cardValidation = {
  createNew, updateCardTitle
}