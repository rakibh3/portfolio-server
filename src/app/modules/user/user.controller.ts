import httpStatus from 'http-status'
import { UserServices } from './user.service'
import { catchAsync } from '../../utils/catchAsync'
import { sendResponse } from '../../utils/sendResponse'

const createUser = catchAsync(async (req, res) => {
  const { ...payLoad } = req.body
  console.log(payLoad)
  // const passwordHistory = playLoad.passwordHistory || []

  // passwordHistory.push(playLoad.password)

  // Store password in password history
  //   const passwordHistory = responseData.passwordHistory || [];
  //   passwordHistory.push(payload.password);
  //   responseData.passwordHistory = passwordHistory;

  //   return responseData;
  // };

  const result = await UserServices.createUserIntoDatabase(payLoad)

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
