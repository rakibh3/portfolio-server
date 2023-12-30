import { TUser } from './user.interface'
import { User } from './user.model'

//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'student';

//   // find academic semester info
//   const admissionSemester = await AcademicSemester.findById(
//     payload.admissionSemester,
//   );

//   if (!admissionSemester) {
//     throw new AppError(400, 'Admission semester not found');
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //set  generated id
//     userData.id = await generateStudentId(admissionSemester);

//     // create a user (transaction-1)
//     const newUser = await User.create([userData], { session }); // array

//     //create a student
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a student (transaction-2)

//     const newStudent = await Student.create([payload], { session });

//     if (!newStudent.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newStudent;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };

// const createFacultyIntoDB = async (password: string, payload: TFaculty) => {
//   // create a user object
//   const userData: Partial<TUser> = {};

//   //if password is not given , use deafult password
//   userData.password = password || (config.default_password as string);

//   //set student role
//   userData.role = 'faculty';

//   // find academic department info
//   const academicDepartment = await AcademicDepartment.findById(
//     payload.academicDepartment,
//   );

//   if (!academicDepartment) {
//     throw new AppError(400, 'Academic department not found');
//   }

//   const session = await mongoose.startSession();

//   try {
//     session.startTransaction();
//     //set  generated id
//     userData.id = await generateFacultyId();

//     // create a user (transaction-1)
//     const newUser = await User.create([userData], { session }); // array

//     //create a faculty
//     if (!newUser.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
//     }
//     // set id , _id as user
//     payload.id = newUser[0].id;
//     payload.user = newUser[0]._id; //reference _id

//     // create a faculty (transaction-2)

//     const newFaculty = await Faculty.create([payload], { session });

//     if (!newFaculty.length) {
//       throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
//     }

//     await session.commitTransaction();
//     await session.endSession();

//     return newFaculty;
//   } catch (err: any) {
//     await session.abortTransaction();
//     await session.endSession();
//     throw new Error(err);
//   }
// };

const createUserIntoDatabase = async (payload: TUser) => {
  const result = await User.create(payload)
  const responseData = await User.findById(result._id, { password: 0 })
  return responseData
}

export const UserServices = {
  createUserIntoDatabase,
}
