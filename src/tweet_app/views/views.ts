import { tweetContollerInstanse } from "../models/tweetModeInstanse"
import { Request, Response } from "express";
import { isValidId } from "../service/createTweet";
import { validationResult } from "express-validator";
import { userControllerInstance } from '../../user_app/models/userModel/userControllerInstance'


export const tweetCreateView = async (req: Request, res: Response) => { // тут пофиксить вынести код
    try {
        if(!isValidId(req.user._id)){
            res.status(400).json({ //возможно написать функцию которая генерит этот обьект
                success: false,
                errors: [{
                    errors: {
                        msg: 'user id is not valid'
                    }}
                ]
            
            })
        }
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