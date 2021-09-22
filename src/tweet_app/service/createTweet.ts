import { Response } from "express";
import mongoose from 'mongoose'


export const isValidId = mongoose.Types.ObjectId.isValid
export const isValidUserIdCreateTweet = (_id: string, res: Response) => {
     
}