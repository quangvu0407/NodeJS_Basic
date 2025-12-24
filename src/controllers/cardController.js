/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'
// import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  try {

    //dieu huong sang service
    const createCard = await cardService.createNew(req.body)

    //co ket qua thi tra ve client
    res.status(StatusCodes.CREATED).json(createCard)
  }
  catch (error) { next(error) }
}

const updateCardTitle = async (req, res, next) => {
  try {
    // console.log('req.params', req.params)
    const cardId = req.params.id

    const updateCard = await cardService.updateCardTitle(cardId, req.body)

    //co ket qua thi tra ve client
    res.status(StatusCodes.CREATED).json(updateCard)
  }
  catch (error) { next(error) }
}

export const cardController = {
  createNew, updateCardTitle
}