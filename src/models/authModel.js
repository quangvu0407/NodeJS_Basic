import Joi, { object } from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { ROLE } from '~/utils/constants'

const ACCOUNT_COLLECTION_NAME = 'account'
const ACCOUNT_COLLECTION_SCHEMA = Joi.object({
  email: Joi.string().required().min(15).max(50).trim().strict(),
  username: Joi.string().required().min(6).max(50).trim().strict(),
  password: Joi.string().required().min(6).max(50).trim().strict(),
  accountOrderIds: Joi.array().items(Joi.string()).default([]),
  role: Joi.string().valid(ROLE.USER, ROLE.ADMIN).default(ROLE.USER),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const validateBeforeCreate = async (data) => {
  return await ACCOUNT_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })
}

const createNewAccount = async (data) => {
  try {
    const validData = await validateBeforeCreate(data)
    const crearedNewAccount = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).insertOne(validData)
    return crearedNewAccount
  }
  catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (accountId) => {
  try {
    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOne({
      _id: new ObjectId(accountId)
    })
    return result
  }
  catch (error) {
    throw new Error(error)
  }
}

const findOneByNameAndPassword = async (account) => {
  try {
    const result = await GET_DB().collection(ACCOUNT_COLLECTION_NAME).findOne({
      username: account.username,
      password: account.password
    })
    return result
  }
  catch (error) {
    throw new Error(error)
  }
}

export const authModel = {
  createNewAccount, findOneByNameAndPassword,
  findOneById
}