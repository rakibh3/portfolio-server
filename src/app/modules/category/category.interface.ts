import mongoose from 'mongoose'

export type TCategory = {
  name: string
  createdBy: mongoose.Types.ObjectId
}
