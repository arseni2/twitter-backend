import express, {Request} from "express";
import {create_user} from "../views/views";
import {userCreateUrlsType} from "./service/urlsTypes";
//import {upload} from "../models/userModel/userModel";
import {userValidation} from '../views/service/validationCreateUser'
import {validationResult} from "express-validator";

export const userRouter = express.Router();

userRouter.post('/create', /*upload.fields([{name: 'avatar', maxCount: 1}, { //тут я не буду сетать фотографии и тогда мне не нужен здесь multer а в постмене создавать юзера буду чрез json
    name: 'header',
    maxCount: 1
}]),*/ userValidation, async (req: Request<userCreateUrlsType>, res: express.Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.json({ errors: errors.array() }).status(400)
    }else{create_user(req, res)}
})
//создать endpoints для редактерования юзера


