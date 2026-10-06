import dotenv from "dotenv"
import path from "path"

dotenv.config({path: path.resolve(`./.env.${process.env.NODE_ENV}`)})

const port = process.env.port
const databaseURI = process.env.DATABSE_URI
const mood = process.env.MOOD
const salt = process.env.SALT
const userSignature = process.env.ACCESS_SIGNATURE_USER
const userRefreshSignature = process.env.REFRESH_SIGNATURE_USER
const adminSignature = process.env.ACCESS_SIGNATURE_ADMIN
const adminRefreshSignature = process.env.REFRESH_SIGNATURE_ADMIN

export const env = {
    port,
    databaseURI,
    mood,
    salt,
    userSignature,
    userRefreshSignature,
    adminSignature,
    adminRefreshSignature
}