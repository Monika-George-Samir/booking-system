import express, { json } from "express"
import { env } from "./config/env.service.js"
import { databaseConnection } from "./database/connection.js"
import authRouter from "./module/auth/auth.controller.js"
import bookingRouter from "./module/booking/booking.controller.js"

const app = express()
databaseConnection()

app.use(json())

app.use("/auth", authRouter)
app.use("/bookings", bookingRouter)
app.use((err, req, res, next)=>{
    let stack = env.mood == "dev" ? err.stack : null
    let status = err.cause ? err.cause.status : 500
    res.status(status).json({message: err.message, stack})
})

app.listen(env.port, ()=>{
    console.log(`server is running on port ${env.port}`);
})