import { NotFoundException, UnAuthorizedException } from "../../common/index.js"
import { bookingModel } from "../../database/model/booking.model.js"
import { userModel } from "../../database/model/user.model.js"

export const createBooking = async(id, body)=>{
    let {title, bookingDate, status} = body 
    let authorizedUser = await userModel.findById(id)
    if (authorizedUser) {
        let addedBooking = await bookingModel.create({userId:id, title, bookingDate, status})
        return{message: "booking created", booking: addedBooking}
    }else{
        return NotFoundException({message: "user not found"})
    }
}


export const getAllBookings = async(id)=>{
    let authorizedUser = await userModel.findById(id)
    if (authorizedUser) {
        let bookingsData = await bookingModel.find({userId: id})
        console.log(bookingsData);
        if (bookingsData.length >0) {
            return {message: "bookings data", bookingsData: bookingsData}
        }
    }else{
        return UnAuthorizedException({message: "unathorized"})
    }
}


export const getBookingByID = async(id, params)=>{
    let {bookingId} = params
    let authorizedUser = await userModel.findById(id)
    if (authorizedUser) {
        let bookingData = await bookingModel.findById(bookingId)
        return {message: "booking data", bookingData: bookingData}
    }else{
        return UnAuthorizedException({message: "unauthorized"})
    }

}


export const updateBooking = async(id, params, body)=>{
    let {bookingId} = params
    let {title, bookingDate, status} = body
    let authorizedUser = await userModel.findById(id)
    if (authorizedUser) {
        let bookingData = await bookingModel.updateOne({title, bookingDate, status})
        return {message: "booking updated", bookingData: bookingData}
    }else{
        return UnAuthorizedException({message: "unauthorized"})
    } 
}
export const deleteBooking = async(id, params, body)=>{
    let {bookingId} = params
    let authorizedUser = await userModel.findById(id)
    if (authorizedUser) {
        let bookingData = await bookingModel.deleteOne(bookingId)
        return {message: "booking deleting", bookingData: bookingData}
    }else{
        return UnAuthorizedException({message: "unauthorized"})
    } 
}

