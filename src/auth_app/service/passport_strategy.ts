import {Strategy as LocalStrategy} from "passport-local";
import passport from "passport";
import {User, userModelType} from "../../user_app/models/userModel/userModel";
import bcrypt from "bcrypt";
import {ExtractJwt as ExtractJWT, Strategy as JWTstrategy} from "passport-jwt";
import {SECRET_KEY, URL_GOOGLE_CALLBACK} from "../../twitter_project/settings";
import {Document} from "mongoose";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import { userControllerInstance } from "../../user_app/models/userModel/userControllerInstance";

declare global {
    namespace Express {
        interface User extends userModelType {
            _id?: string,
            password?: string,
        }
    }
}
export type userGoogleTypes = {
    id: string,
    displayName: string,
    name: { familyName: string, givenName: string },
    emails: Array<{ value: string, verified: boolean }>,
    photos: Array<{
        value: string
    }>,
    provider: string,
    _raw: any,
    _json: any
}

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({$or: [{name: username}, {email: username}]}, function (err: any, user: userModelType & Document | null) {
            if (err) {
                return done(err);
            }
            if (user) {
                bcrypt.compare(password, user.password).then(function (result: boolean) {
                    if (result) {
                        return done(null, user)
                    } else {
                        return done(null);
                    }
                });
            } else {
                return done(null);
            }
        }).select(['+password', ])
    }
));

passport.serializeUser((user, done: any) => {
    done(null, user._id)
})
passport.deserializeUser((id, done) => {
    User.findById(id, (err: any, user: userModelType | null) => {
        done(null, user)
    })
})

passport.use(
    new JWTstrategy(
        {
            secretOrKey: SECRET_KEY,
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('token'),

        },
        async (token: { user: userModelType }, done) => {
            try {
                return done(null, token.user);
            } catch (error) {
                console.log(error)
            }
        }
    )
);

passport.use(new GoogleStrategy({
        clientID: process.env.CLIENT_ID_GOOGLE_AUTH || '',
        clientSecret: process.env.CLIENT_SECRET_GOOGLE_AUTH || '',
        callbackURL: URL_GOOGLE_CALLBACK,
        passReqToCallback: true
    },//@ts-ignore
    async function (req, refreshToken, profile, user: userGoogleTypes, done,) {
        try {
            //login
            let userFromDB = await User.findOne({$or: [{name: user.name.familyName}, {email: user.emails[0].value}]})
            if (userFromDB) {
                //login success
                return done(null, userFromDB)
            } else {
                throw new Error('user no logined')
            }
        } catch (e) {
            let userCreated = await userControllerInstance.createUserWithGoogle(user)
            done(null, userCreated)
        }
    }
));
export {passport}
