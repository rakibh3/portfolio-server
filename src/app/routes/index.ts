import { Router } from 'express'
import { CourseRoute } from '../modules/course/course.route'
import { CategoryRouter } from '../modules/category/category.route'
import { ReviewRoute } from '../modules/review/review.route'
import { UserRoute } from '../modules/user/user.route'
import { AuthRoute } from '../modules/Auth/auth.route'

const router = Router()

// Registering all routes
router.use(CourseRoute)
router.use(CategoryRouter)
router.use(ReviewRoute)
router.use(UserRoute)
router.use(AuthRoute)

export default router
