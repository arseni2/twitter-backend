import { Router } from "express";
import { passport } from "../../auth_app/service/passport_strategy";
import { createTweetValidation } from "../validation/createTweetValidation";
import { tweetCreateView } from "../views/views";
import {Request, Response} from "express";
import { isValidId } from "../service/createTweet";
import { tweetContollerInstanse } from "../models/tweetModeInstanse";


export const tweetRouter = Router();

tweetRouter.post('/create', createTweetValidation, passport.authenticate('jwt', {session: false}), (req: Request, res: Response) => {
    // можно сделать как в user_app urls 
    tweetCreateView(req, res)
})
tweetRouter.delete('/delete/:tweet_id', async (req: Request, res: Response) => {//вынести во вьюху
    let tweet_id = req.params.tweet_id
    if(!isValidId(tweet_id)) { //мб вынести куда-нибудь
        res.status(400).json({ error: 'Invalid tweet id'})
        return;
    }
    let tweet = await tweetContollerInstanse.deleteTweet(tweet_id)
    res.status(200).json({ 
        ...tweet
    })
})

tweetRouter.put('/update/:tweet_id', async (req: Request, res: Response) => {//вынести во вьюху
    let text = req.body.text
    let tweet_id = req.params.tweet_id
    if(!isValidId(tweet_id)) { //мб вынести куда-нибудь
        res.status(400).json({ error: 'Invalid tweet id'})
        return;
    }
    let tweet = await tweetContollerInstanse.updateTweet(tweet_id, {text})
    res.status(200).json({
        wholeTweet: tweet
    })
})

