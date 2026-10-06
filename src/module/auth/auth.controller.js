import { Router } from "express";
import { generateAccessToken, login, signup } from "./auth.service.js";

const router = Router()

router.post("/signup", async(req, res)=>{
    let data = await signup(req.body)
    res.json(data)
})

router.post("/login", async(req,res)=>{
    let data = await login(req.body)
    res.json(data)
})

router.post("/generate-access-token", async(req,res)=>{
    let accessToken = await generateAccessToken(req.body)
    res.json(accessToken)
})



export default router