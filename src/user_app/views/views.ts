import {Request, Response} from "express";
import {userCreateUrlsType} from "../urls/service/urlsTypes";
import {sendMailConfirm} from "./service/sendMail";
import {userControllerInstance} from "../models/userModel/userControllerInstance";


export const create_user = async (req: Request<userCreateUrlsType>, res: Response) => {
    let data = {
        slug: req.body.slug, //не должна сетаться картинка при создании. если это гугл auth то должна
        name: req.body.name,
        data_both: req.body.data_both,
        about: req.body.about,
        country: req.body.country,
        email: req.body.email
    }
    let user = userControllerInstance.createUser(data, req.body.password)
    user.save((err) => {
        if (err) {
            res.status(400).json({err})
        } else {
            sendMailConfirm(user.email, user.confirmed_hash).catch(console.error)
            res.json({user})
        }

    })
}