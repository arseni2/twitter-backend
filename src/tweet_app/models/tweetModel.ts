import { Schema, model, Document } from "mongoose";
import {MAX_LENGTH_TEXT_TWEET} from "../../twitter_project/settings"

export type tweetTypes = {
    text: string,
    user: string,

}
export type tweetModelType = tweetTypes & Document
export const tweetSchema = new Schema<tweetTypes>({
    text: {
        required: true,
        type: String,
        maxLength: MAX_LENGTH_TEXT_TWEET
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
})

export const tweetModel = model('Tweet', tweetSchema)