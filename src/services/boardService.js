/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatter'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    //Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong db
    const createdBoard = await boardModel.createNew(newBoard)
    console.log(createdBoard)

    // lấy bản ghi board sau khi gọi tùy dự án có cần bước này hay ko
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    console.log(getNewBoard)

    //Tra ket qua ve, trong service luon phai co return.
    return getNewBoard
  }
  catch (error) { throw (error) }
}

export const boardService = {
  createNew
}