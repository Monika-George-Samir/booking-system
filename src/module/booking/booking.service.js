import { NotFoundException, StatusEnum, UnAuthorizedException } from "../../common/index.js"
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
        let bookingData = await bookingModel.findByIdAndUpdate({_id: bookingId, userId: id},{title, bookingDate, status}, {new:true})
        console.log(bookingData);
        if (!bookingData) {
            return NotFoundException({ message: "Booking not found" });
        }
        return {message: "booking updated", bookingData: bookingData}
    }else{
        return UnAuthorizedException({message: "unauthorized"})
    } 
}



export const cancelBooking = async(id, params)=>{
    let {bookingId} = params
    let authorizedUser = await userModel.findById(id)
    if (authorizedUser) {
        let cancelBookingData = await bookingModel.findByIdAndUpdate(
            { _id: bookingId, userId:id },
            {status : StatusEnum.Cancelled},
            {new: true}
        )
        if (!cancelBookingData) {
            return NotFoundException({message: "booking not found"})
        }
        return {message: "booking cancelled", bookingData: cancelBookingData}
    }else{
        return UnAuthorizedException({message: "unauthorized"})
    } 
}

