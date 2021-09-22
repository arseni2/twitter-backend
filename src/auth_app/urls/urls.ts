import express from "express";
import {passport} from "../service/passport_strategy";
import {authGoogleView, authLoginView, authLogoutView} from "../views/views";
import {removeUserFieldsMiddleware} from "../../user_app/middleware/removeUserFieldsMiddleware";


export const authRouter = express.Router();

authRouter.post('/login', passport.authenticate('local', {session: false}), (req, res) => {
    authLoginView(req, res)
})
authRouter.get('/profile', passport.authenticate('jwt', {session: false}), removeUserFieldsMiddleware, (req, res) => {
    res.json(req.user)
})
authRouter.get('/google', passport.authenticate('google', {scope: ['profile', 'email'], session: false}));

authRouter.get('/google/callback', passport.authenticate('google', {
    session: false,
    failureFlash: true
}), (req, res) => {
    authGoogleView(req, res)
});
authRouter.get('/logout', (req, res) => {
    authLogoutView(req, res)
})