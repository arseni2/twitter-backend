import { body, validationResult } from 'express-validator';
import { Request, Response } from 'express'

export const createTweetValidation = [
    body('text').isLength({ max: 250, min: 1 }),
]
