import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'

const createNew = async (reqBody) => {
  try {
    //Xu ly logic du lieu
    const newColumn = {
      ...reqBody
    }

    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    //....
    if (getNewColumn) {
      // Xử lý cấu trúc data của column, khi thêm column trong frontend thì đã có sẵn cards [] rỗng!
      getNewColumn.cards = []

      // Cập nhật lại mảng columnOrderIds
      await boardModel.pushColumnOrderIds(getNewColumn)

    }

    return getNewColumn
  }
  catch (error) { throw (error) }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)


    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId, reqBody) => {
  try {
    //Xóa column
    await columnModel.deleteOneById(columnId)

    //Xóa toàn bộ card thuộc column
    await cardModel.deteteManyByColumnId(columnId)

    // return
    return { deleteResult: 'Column and its Cards deleted successfully'}
  } catch (error) { throw error }
}


export const columnService = {
  createNew, update, deleteItem
}