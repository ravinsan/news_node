import multer from "multer";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import userSchema from "../validation/signup_validation.js";
import signInValidation from "../validation/signin_validation.js";
import jwt from "jsonwebtoken";


export const signUp = async (req, res) =>{
    console.log(req.body);
    
   const {name, email, password, mobile, status} = req.body;
   const data = {name, email, password, mobile, status};
    
    const {error} = userSchema.validate(data);
    if(error) return res.status(400).json({message: error.details[0].message});

    // check for duplicate email
    const checkDuplicateEmail = await User.findOne({email: email});
    if(checkDuplicateEmail) return res.status(409).json({message: "Email already exists"});

    const hashedPassword = await bcrypt.hash(password, 10);

   try{
         const userData = {
             name: name,
             email: email,
             password: hashedPassword,
             mobile: mobile,
             status: status
         }

         const user = await User.create(userData);
         
         res.status(201).json({
            success: true,
            message: "User created successfully",
            user: user,
        });
    } catch (err) {
        res.status(500).json({
            message: err.message,
        });
   }
}

export const signIn = async (req, res) => {
    const {email, password} = req.body;
    
    const {error} = signInValidation.validate(req.body);
    if(error) return res.status(400).json({message: error.details[0].message});

    try{
        const user = await User.findOne({ email: email });

        if(!user)
        {
            return res.status(401).json({ message: "User not found" });
        }
        
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
        {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const payload = {user_id: user._id, name: user.name, email: user.email, mobile: user.mobile};
        
        const token = jwt.sign({payload,}, process.env.JWT_SECRET, {expiresIn: "12h"});
        
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24,
            sameSite: "none",
            secure: true,
        });

        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token: token,
            user: user,
        });
    }
    catch(err)
    {
        return res.status(500).json({
            message: err.message,
        });

    }

}

export const logout = (req, res) => {
    
    if(!req.cookies.token) return res.status(401).json({success: false, message: "You have already been logged out."});
    
    res.clearCookie("token");
    
    return res.status(200).json({
        success: true,
        message: "User is successfully logged out."
    });


};