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
        type: String,
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