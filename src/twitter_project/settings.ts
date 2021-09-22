export const PORT = process.env.PORT
export const MONGO_URL = String(process.env.MONGO_URL)
export const SECRET_KEY = 'L8t^q@Gnm26G'
export const URL = `${process.env.PROTOCOL}://${process.env.DOMEN}:${process.env.PORT}/`
export const URL_GOOGLE_CALLBACK = `${process.env.PROTOCOL}://${process.env.DOMEN}:${process.env.PORT}/auth/google/callback`
export const MAX_LENGTH_TEXT_TWEET = 250