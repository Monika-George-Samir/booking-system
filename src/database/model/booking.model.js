import { model, Schema } from "mongoose";
import { StatusEnum } from "../../common/index.js";

const bookingSchema = new Schema({
    userId: {
        type: String,
        required:true
    },
    title: {
        type: String,
    },
    bookingDate: {
        type: Date,
        validate: {
            validator: function(value) {
                return value >= new Date();
            },
            message: "Booking date cannot be in the past" 
        }
    },
    status:{
        type: String,
        enum: StatusEnum,
        default: StatusEnum.Pending
    }
},{
    timestamps: true
})

export const bookingModel = model("booking", bookingSchema)