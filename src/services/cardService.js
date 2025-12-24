import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu
    const newCard = {
      ...reqBody
    }

    const createdCard = await cardModel.createNew(newCard)
    const getNewCard = await cardModel.findOneById(createdCard.insertedId)

    //....
    if (getNewCard) {
      // add new cardId in cardOrderIds
      await columnModel.pushCardOrderIds(getNewCard)
    }
    return getNewCard
  }
  catch (error) { throw (error) }
}

const updateCardTitle = async (cardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updateCard = await cardModel.updateCardTitle(cardId, updateData)


    return updateCard
  } catch (error) { throw error }
}

export const cardService = {
  createNew, updateCardTitle
}