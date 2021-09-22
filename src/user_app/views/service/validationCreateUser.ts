import {body, validationResult, check} from "express-validator"
import validator from "validator";

export let userValidation = [
    body('email').isEmail()
]