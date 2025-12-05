/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { columnService } from '~/services/columnService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {

    //dieu huong sang service
    const createColumn = await columnService.createNew(req.body)

    //co ket qua thi tra ve client
    res.status(StatusCodes.CREATED).json(createColumn)
  } 
  catch (error) { next(error) }
}

export const columnController = {
  createNew
}