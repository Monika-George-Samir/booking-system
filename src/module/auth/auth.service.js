import { BadRequestException, compareHash, ConflictException, generateHash, NotFoundException } from "../../common/index.js"
import { generateNewAccessToken, generateToken } from "../../common/services/token.service.js"
import { userModel } from "../../database/model/user.model.js"


export const signup = async(body)=>{
    let {fullName, email, password} = body
    let existedUser = await userModel.findOne({email})
    if (existedUser) {
        return ConflictException({message: "Email already exists"})
    }else{
        let hashedPassword = await generateHash({plainText: password})
        if (hashedPassword) {
            let addedUser = await userModel.create({fullName, email, password:hashedPassword})
            return {message: "added", user: addedUser}
        }
    }
}


export const login = async(body)=>{
    let {email, password} = body
    let userData = await userModel.findOne({email})
    if (!userData) {
        return NotFoundException({message: "user not found"})
    }
    let isMatched = await compareHash({plainText: password, hashedText: userData.password})
    console.log(isMatched);
    
    if (isMatched) {
        let {accessToken, refreshToken} = generateToken(userData)
        return {message: "login successfully", accessToken, refreshToken}
    }else{
        return BadRequestException({message:"incorrect password"})
    }
}


export const generateAccessToken = (body)=>{
    let {refreshToken} = body
    let {accessToken} = generateNewAccessToken(refreshToken)
    if (accessToken) {
        return {accessToken}
    }else{
        throw BadRequestException({message: "invalid token"})
    }
}