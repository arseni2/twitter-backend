import { Response, Request, NextFunction } from "express"
import { isValidId } from "../../service/createTweet"

// возможно вынести это в отдельный файл для middleware
export const isValidIdUserMiddleware = (req: Request, res: Response, next: NextFunction) => { // мб как-нибудь обьеденить эту логику
    if(!isValidId(req.user._id)){
        return res.status(400).json({ //возможно написать функцию которая генерит этот обьект
            success: false,
            errors: [
                {
                    msg: 'user id not correct'
                }
            ]
        
        })
    } else {
        next()
    }
}

export const isValidTweetMiddleware = (req: Request, res: Response, next: NextFunction) => { // мб как-нибудь обьеденить эту логику
    if(!isValidId(req.params.tweet_id)){
        return res.status(400).json({ //возможно написать функцию которая генерит этот обьект
            success: false,
            errors: [
                {
                    msg: 'tweet id not correct'
                }
            ]
        
        })
    } else {
        next()
    }
}