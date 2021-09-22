import * as mongoose from "mongoose";
import {Document, Schema} from "mongoose";
import multer from "multer";
import path from 'path'
import uniqueValidator from "mongoose-unique-validator";

export type userModelType = {
    _id: string,
    data_both: string,
    name: string,
    slug: string,
    header: string,
    avatar: string,
    about: string,
    country: string,
    password: string,
    confirmed?: boolean,
    confirmed_hash?: string,
    email: string,
    createdAt: string,
    updatedAt: string
}
export const userScheme = new Schema<Document<userModelType>>({// мои твиты. лайкнутые твиты. твиты с картинкой. твитыы на которые ответили. подпищики. подписки.
    data_both: {type: Date, required: false, default: ''},
    name: {type: String, unique: true},
    slug: {type: String, unique: true, required: true},
    header: {type: String, required: false, default: ''}, // тут будет называние файла картинки
    avatar: {type: String, required: false, default: ''}, // тут будет называние файла картинки
    about: {type: String, default: '', required: false},
    country: {type: String, required: false, default: ''},
    password: {
        type: String,
        required: true,
        select: false
    },
    confirmed: {
        type: Boolean,
        default: false
    },
    confirmed_hash: {
        type: String,
        required: true,
        select: false
    },
    email: {type: String, required: true, unique: true}
}, {timestamps: true});

userScheme.plugin(uniqueValidator);
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../../../images'));
    },
    filename: (req, file, cb) => {
        let filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + String(new Date().getTime()) + '.' + filetype);
    }
})

userScheme.set('toJSON', {
    transform: (user, obj) => {
        //user - это новоиспечённый пользователь
        delete obj.password
        //delete obj._id
        delete obj.__v
        return obj
    }
})
export let upload = multer({storage: storage})//.fields([{ name: 'avatar', maxCount: 1 }, { name: 'header', maxCount: 1 }])
export const User = mongoose.model<userModelType>("User", userScheme);


