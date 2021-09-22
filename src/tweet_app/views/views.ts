import { tweetContollerInstanse } from "../models/tweetModeInstanse"
import { Request, Response } from "express";
import { validationResult } from "express-validator";
import { userControllerInstance } from '../../user_app/models/userModel/userControllerInstance'
import { tweetModel } from "../models/tweetModel";


export const tweetCreateView = async (req: Request, res: Response) => { // тут пофиксить вынести код
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        let user = req.user._id
        let text = req.body.text
        let tweet = await tweetContollerInstanse.createTweet({ text, user })
        let tweetData = tweet.toJSON()
        let userForTweet = await userControllerInstance.findUserByIdForTweet(tweetData.user)
        res.json({
            success: true,
            tweet: tweet,
            user: userForTweet
        })
    } catch (err) {
        console.log(err)
    }
}

export const tweetDeleteView = async (req: Request, res: Response) => {
    let tweet_id = req.params.tweet_id
    let tweet = await tweetContollerInstanse.deleteTweet(tweet_id)
    res.status(200).json({ 
        ...tweet
    })
}

export const tweetUpdateView = async (req: Request, res: Response) => {
    let text = req.body.text
    let tweet_id = req.params.tweet_id
    let tweet = await tweetContollerInstanse.updateTweet(tweet_id, {text})
    res.status(200).json({
        wholeTweet: tweet
    })
}

export const tweetPagination = async (req: Request, res: Response) => {
    let page = Number(req.params.page)
    let perPage = 5 // сколько записей отдаю на странице
    let skip = (page - 1) * perPage
    let tweets = await tweetModel.find({}).skip(skip).limit(perPage) // мб вынести в tweetController
    let pageCount = await tweetModel.countDocuments()
    let next = page*perPage < pageCount
    let nextPage = next ? page + 1 : null
    res.json({
        tweets: tweets,
        pageCount,
        next,
        nextPage
    })
}