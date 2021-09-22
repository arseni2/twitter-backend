import express from "express";
import jwt from "jsonwebtoken";
import {SECRET_KEY} from "../../twitter_project/settings";
import {userControllerInstance} from "../../user_app/models/userModel/userControllerInstance";


export const authLoginView = (req: express.Request, res: express.Response) => {
    //@ts-ignore
    const user = req.user?.toJSON()
    const token = jwt.sign({ user }, SECRET_KEY, {expiresIn: eval(process.env.EXPIRES_TOKEN || ``)}) //10day
    res.cookie('token',token, { maxAge: Number(process.env.EXPIRES_TOKEN_COOKIE), httpOnly: false });
    return res.json({ ...user });
}

export const authGoogleView = (req: express.Request, res: express.Response) => {
    if (req.user) {
        let user = req.user
        const token = jwt.sign({user}, SECRET_KEY, {expiresIn: eval(process.env.EXPIRES_TOKEN || ``)})
        // 864000000 = 10 days
        res.cookie('token',token, { maxAge: Number(process.env.EXPIRES_TOKEN_COOKIE), httpOnly: false });
        res.redirect('http://localhost:3000/profile')// если где увижу решение элгантнее то в комменты напишу
        // сделать logout и всё протестить
    }
}

export const authLogoutView = (req: express.Request, res: express.Response) => {
    res.clearCookie("token"); //надо просто удалять куку
    res.json({
        success: true,
        token: req.cookies
    })
}

export const verifyUserView = async (req: express.Request, res: express.Response) => {
    try {
        let hash = req.query.hash as string
        let user = await userControllerInstance.findByHash(hash)
        if (!user) {
            throw new Error('user null')
        }
        const token = jwt.sign({user}, SECRET_KEY, {expiresIn: eval(process.env.EXPIRES_TOKEN || ``)}) //10min
        res.cookie('token', token, {maxAge: Number(process.env.EXPIRES_TOKEN_COOKIE), httpOnly: false});// тут по сути должна отправлятся кука на урл клиента если нет то надо гуглить
        res.json({
            success: user?.confirmed,
        })
    } catch (e) {
        res.json({
            success: false
        })
    }
}