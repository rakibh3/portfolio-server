/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express'
import httpStatus from 'http-status'
import { sendResponse } from '../../utils/sendResponse'
import { CategoryServices } from './category.service'
import { catchAsync } from '../../utils/catchAsync'

// Creates a new category
const createCategory = catchAsync(async (req, res) => {
  const { ...name } = req.body
  const result = await CategoryServices.createCategoryIntoDatabase(name)
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Category created successfully',
    data: result,
  })
})

// Gets all categories
const getAllCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.getAllCategoryFromDatabase()

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Categories retrieved successfully',
    data: result,
  })
})

// Exports all controllers
export const CategoryController = {
  createCategory,
  getAllCategory,
}
