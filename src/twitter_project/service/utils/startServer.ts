import {PORT} from "../../settings";
import {Express} from "express";
import mongoose from "mongoose";
import {User, userModelType} from "../../../user_app/models/userModel/userModel";

export const startServer = async (app: Express) => {
    // initMiddleware(app)
    await mongoose.connect('mongodb://localhost:27017/twitter_db', {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
    }); //mb use mongoClient
    mongoose.connection.db.collection('users', async (err, coll) => {
        await coll.createIndex({createdAt: 1}, {
            expireAfterSeconds: 60 * 20, //20min //вынести в settings
            partialFilterExpression: {
                confirmed: false
            }
        });
    })
    app.listen(PORT, () => {
        console.log(`Example app listening at http://localhost:${PORT}`)
    })
}
