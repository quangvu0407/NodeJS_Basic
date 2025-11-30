/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong db
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log(createdBoard)

    // lấy bản ghi board sau khi gọi tùy dự án có cần bước này hay ko
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log(getNewBoard)

    //Tra ket qua ve, trong service luon phai co return.
    return getNewBoard
  }
  catch (error) { throw (error) }
}

const getDetails = async (boardId) => {
  try {
    const board = await boardModel.getDetails(boardId)
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'board not found!')
    }

    // Bước 1 deep clone 1 resBoard từ Board
    const resBoard = cloneDeep(board)

    // Bước 2 Đưa card về đúng column
    resBoard.columns.forEach(col => {
      col.cards = resBoard.cards.filter(card => card.columnId.equals(col._id))
      // col.cards = resBoard.cards.filter(card => card.columnId.toString() === col._id.toString())
    })
    // Bước 3 Xóa cards trong Board vì đã đưa vào column rồi
    delete resBoard.cards

    return resBoard
  } catch (error) { throw error }
}

export const boardService = {
  createNew, getDetails
}