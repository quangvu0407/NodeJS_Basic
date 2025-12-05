import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

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

export const columnService = {
  createNew
}