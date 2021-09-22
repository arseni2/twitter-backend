import {User, userModelType} from "./userModel";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { userGoogleTypes } from "../../../auth_app/service/passport_strategy";


export const salt = bcrypt.genSaltSync(10);

class userControllerClass {
    async findByHash(hash: string): Promise<userModelType | null> {
        //посмотреть у арчакова как тут типизировать
        let user: any = await User.findOneAndUpdate({confirmed_hash: hash}, {$unset: {confirmed_hash: ''}})
        if(user === null){
            return user
        }
        user.confirmed = true
        await user.save()
        return user
    }

    createUser(data: any, pass: string) {
        console.log(data)
        //let files = JSON.parse(JSON.stringify(filesParam))
        let user = new User({...data})
        user.confirmed_hash = crypto.randomBytes(10).toJSON().data.toString().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "")
        //user.header = `http://localhost:8000/imageurl?image=${files.header[0].filename}`
        //user.avatar = `http://localhost:8000/imageurl?image=${files.avatar[0].filename}`
        user.password = bcrypt.hashSync(pass, 10)
        return user
    }
    async createUserWithGoogle(user: userGoogleTypes){
        let slug_str = user.emails[0].value
        let slug = slug_str.substring(0, slug_str.length - 10);
        let userCreated = await User.create({
            name: user.name.givenName,
            email: user.emails[0].value,
            password: user.id,
            avatar: user.photos[0].value,
            slug: slug,
            confirmed: true,
            confirmed_hash: user.id

        })
        return userCreated;
    }
    async findUserByIdForTweet(id: string): Promise<null | userModelType> {
        try {
            let user = await User.findById(id).select(["-data_both", "-header", "-about", "-country", "-email", "-createdAt", "-updatedAt"])
            return user
        } catch(err) {
            console.log(err)
            return null
        }
    }
}

export const userControllerInstance = new userControllerClass()