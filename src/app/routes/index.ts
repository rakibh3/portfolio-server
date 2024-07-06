import { Router } from 'express'
import { ExperienceRoute } from '../modules/Experience/experience.route'

const router = Router()

// Registering all routes
router.use(ExperienceRoute)

export default router
