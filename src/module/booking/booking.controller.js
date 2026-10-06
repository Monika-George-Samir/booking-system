import { Router } from "express";
import { createBooking, deleteBooking, getAllBookings, getBookingByID, updateBooking } from "./booking.service.js";
import { auth } from './../../common/middleware/auth.middleware.js';

const router = Router()

router.post("/",auth, async(req, res)=>{
    let data = await createBooking(req.user.id, req.body)
    res.json(data)
})

router.get("/",auth, async(req, res)=>{
    let data = await getAllBookings(req.user.id)
    res.json(data)
})

router.get("/:bookingId",auth, async(req, res)=>{
    let data = await getBookingByID(req.user.id, req.params)
    res.json(data)
})
router.put("/:bookingId",auth, async(req, res)=>{
    let data = await updateBooking(req.user.id, req.params, req.body)
    res.json(data)
})

router.delete("/:bookingId",auth, async(req, res)=>{
    let data = await deleteBooking(req.user.id, req.params)
    res.json(data)
})


export default router;