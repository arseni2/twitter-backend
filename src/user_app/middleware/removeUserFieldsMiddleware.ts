import express from "express";


export const removeUserFieldsMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
    delete req.user?.confirmed_hash
    next()
}