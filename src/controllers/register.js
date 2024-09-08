import multer from "multer";
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import userSchema from "../validation/signup_validation.js";


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
