import {config} from "dotenv";
config()
import {userRouter} from "../user_app/urls/urls";
import express from "express";
import {startServer} from "./service/utils/startServer";
import passport from "passport";
import cors from "cors";
import cookieParser from "cookie-parser";
import {authRouter} from "../auth_app/urls/urls";
import { projectRoute } from "./urls";
import { tweetRouter } from "../tweet_app/urls/urls";


//TODO:
    //3. твиты(посты) доделать как у арчакова + провести небольшой codereview приложения tweet_app
    //4. смотерть archakov и продолжать пилить твиттер
//MORE:
    //2. надо вынести логику из startServer в модель юзера потом сделаю mongoClient
    //ts-mongoose
    //7. можно сверстать email письмо как в твиттере
//TUTORIALS:    
    // глянуть ооп на js and node js как их применять всё в плейлисте js+
    //https://stackoverflow.com/questions/63221271/email-confirmation-in-node-js тут про удаление через некоторое время
//CONSTANT:
    //1. не забывать коммитить изменнения на гит
    //2. token send with cookie
    //3. смотреть дмитирия подгорного
const app = express()
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: false }))
app.use(passport.initialize());
startServer(app)

app.use('/', projectRoute)
app.use('/users', userRouter);
app.use('/auth', authRouter);
app.use('/tweet', tweetRouter)