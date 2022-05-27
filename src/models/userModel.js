import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export const UserSchema = new Schema({
    username: {
        type: String,
        required: 'Enter a first name'
    },
    email: {
        type: String,
        required: [true,'Email is required']
    },
    hashPassword: {
        type: String,
        required:true,
    },
    created_date: {
       type: Date,
       default: Date.now 
    }
});

UserSchema.methods.comparePassword = (password,hashPassword) =>{
    return bcrypt.compareSync(password,hashPassword);
}