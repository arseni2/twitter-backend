import { userControllerInstance } from "../../user_app/models/userModel/userControllerInstance";
import { userModelType } from "../../user_app/models/userModel/userModel";
import { tweetModel, tweetModelType, tweetTypes } from "./tweetModel";

class tweetContoller {
    async createTweet (data: tweetTypes): Promise<tweetModelType> {
        let tweet = await tweetModel.create({...data})
        return tweet
    }
    async deleteTweet (id: string): Promise<{success: boolean, error: null | string}> {
        let tweet = await tweetModel.findById(id)
        if(!tweet) {
            return {success: false, error: 'item has been removed'}
        }
        await tweet.remove()
        return {success: true, error: null}
    }
    async updateTweet(id: string, data: {text: string}): Promise<{tweet: tweetModelType, user: userModelType} | {success: boolean, error: string}> {
        let tweet = await tweetModel.findOneAndUpdate({_id: id}, {...data})
        if(!tweet) {
            return {success: false, error: 'twet not found'}
        }
        let tweetUpdated = await tweetModel.findById(id) //если что то при необходимости напишу валидацию
        let user = await userControllerInstance.findUserByIdForTweet(tweetUpdated.user)
        let obj = {
            tweet: tweetUpdated,
            user
        }
        return obj
    }
}

export const tweetContollerInstanse = new tweetContoller()