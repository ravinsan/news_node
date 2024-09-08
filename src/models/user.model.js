import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mobile: Number,
    image: String,
    status: {type:Boolean, default: false},
    create_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
    updated_by:{type:mongoose.Schema.Types.ObjectId, ref: "User"},
}, {timestamps: true});

const User =  mongoose.model('User', userSchema);
export default User;