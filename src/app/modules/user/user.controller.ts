import httpStatus from 'http-status'
import { UserServices } from './user.service'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'

const createUser = catchAsync(async (req, res) => {
  const { ...playLoad } = req.body

  const result = await UserServices.createUserIntoDatabase(playLoad)

  let message
  if (result?.role === 'user') {
    message = 'User registered successfully'
  } else if (result?.role === 'admin') {
    message = 'Admin registered successfully'
  }

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message,
    data: result,
  })
})

export const UserControllers = {
  createUser,
}
