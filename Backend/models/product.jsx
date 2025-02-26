import mongoose, { mongo } from "mongoose";

const productSchema = mongoose.Schema(
    {
        title:{
            type:String,
            required:true, 
        },
        description:{
            type:String,
            required:true, 
        },
        price:{
            type:number,
            required:true,
        }
    }
)

export const product = mongoose.model('Cat',{name:string})