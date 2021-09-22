import express from "express";
import path from 'path'
import swaggerUI from "swagger-ui-express";
import {verifyUserView} from "../auth_app/views/views";
import swagger from "./service/docs/swagger";

export const projectRoute = express.Router()
projectRoute.get('/imageurl', (req, res) => {
    res.sendFile(path.join(__dirname, '../') + 'images/' + '/' + req.query.image)
})
projectRoute.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swagger))

projectRoute.get('/verify', async (req, res) => {
    await verifyUserView(req, res)
})

