/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendResponse } from '../../utils/sendResponse'
import { catchAsync } from '../../utils/catchAsync'
import { ExperienceServices } from './experience.service'

// Creates a new experience
const createExperience = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceServices.createExperienceIntoDatabase(req.body)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Experience created successfully!',
    data: result,
  })
})

// Get all experiences
const getAllExperiences = catchAsync(async (req: Request, res: Response) => {
  const result = await ExperienceServices.getAllExperiencesFromDatabase()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experiences retrieved successfully',
    data: result,
  })
})

// Update an experience
const updateExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ExperienceServices.updateExperienceFromDatabase(
    id,
    req.body,
  )

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experience updated successfully!',
    data: result,
  })
})

// Delete an experience
const deleteExperience = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params
  const result = await ExperienceServices.deleteExperienceFromDatabase(id)

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Experience deleted successfully!',
    data: result,
  })
})

// Exports all controllers
export const ExperienceController = {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
}
