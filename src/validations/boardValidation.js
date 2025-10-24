/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import { json } from 'express'

const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required.',
      'string.empty': 'Title is not allowed to be empty.',
      'string.min': 'Title min 3 chars.',
      'string.max': 'Title max 50 chars',
      'string.trim': 'Title must not have leading or training whitespace.'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    console.log(req.body)

    //Trả về nhiều lỗi(cho abortEarly: false), nếu k set thì chỉ lấy lỗi đầu tiên phát hiện
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // next()
    return res.status(StatusCodes.CREATED).json({ message: 'POST: APIs v1 create new board from validation.' })
  }
  catch (error) {
    console.log(error)
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}