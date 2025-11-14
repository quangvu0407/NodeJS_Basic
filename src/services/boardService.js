/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatter'

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //Tra ket qua ve, trong service luon phai co return.
    return newBoard
  }
  catch (error) { throw (error) }
}

export const boardService = {
  createNew
}