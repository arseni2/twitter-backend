import { Router } from "express";
import { passport } from "../../auth_app/service/passport_strategy";
import { createTweetValidation } from "../validation/createTweetValidation";
import { tweetCreateView, tweetDeleteView, tweetPagination, tweetUpdateView } from "../views/views";
import {Request, Response} from "express";
import { isValidIdUserMiddleware, isValidTweetMiddleware } from "../views/service/viewService";


export const tweetRouter = Router();

tweetRouter.post('/create', createTweetValidation, passport.authenticate('jwt', {session: false}), isValidIdUserMiddleware, (req: Request, res: Response) => {
    // можно сделать как в user_app urls 
    tweetCreateView(req, res)
})
tweetRouter.delete('/delete/:tweet_id', isValidTweetMiddleware,  async (req: Request, res: Response) => {
    tweetDeleteView(req, res)
})

tweetRouter.put('/update/:tweet_id', isValidTweetMiddleware,  async (req: Request, res: Response) => {
    tweetUpdateView(req, res)
})

tweetRouter.get('/tweets/:page', async (req: Request, res: Response) => {
    tweetPagination(req, res)
})

