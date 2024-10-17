import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import {HTTP_STATUS} from "../trait/httpStatus.js";

export const users = async (req, res) =>{
    try{
          const users = await User.find().select('-password').sort({ createdAt: -1 });
          return res.status(200).json({sucess: true, data: users});
    }
    catch(err){
        return res.status(500).json({message: err.message})
    }
}

export const usersInsert = async (req, res) => {
	console.log(req.body);
     const {name, email, password, mobile, status} = req.body;
     try{
            const checkDuplicateEmail = await User.findOne({email: email});
            if(checkDuplicateEmail) return res.status(409).json({message: "Email already exists"});

            const passwords = bcrypt.hashSync(password, 10);
            const userData = {
                name: name,
                email: email,
                password: passwords,
                mobile: mobile,
                status: status
            }

            const user = await User.create(userData);
            return res.status(201).json({sucess: true, message:"User is Successfully saved.", data: user});
     }       
     catch(err){
        return res.status(500).json({message: err.message})
     }
}

export const View = async (req, res) => {
      const id = req.params.id;
      try{
            const user = await User.findById(id).select('-password');
            if(!user) return res.status(404).json({message: "User not found"});
            
            return res.status(200).json({sucess: true, data: user});
      }
      catch(err)
      {
          return res.status(500).json({message: err.message})
      }
  };

export const usersUpdate = async (req, res) => {
    const id = req.params.id;
    const { name, email, password, mobile, status } = req.body;

    try {
        // Check if the user exists
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Check for duplicate email, excluding the current user
        const checkDuplicateEmail = await User.findOne({ email: email, _id: { $ne: id } });
        if (checkDuplicateEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        
        const data = {
            name: name,
            email: email,
            mobile: mobile,
            status: status
        };

        // Only update the password if it's provided
        if (password) {
            const hashedPassword = bcrypt.hashSync(password, 10);
            data.password = hashedPassword;
        }

        const updateUser = await User.findByIdAndUpdate(id, data, { new: true });
        if (!updateUser) {
            return res.status(404).json({ message: "User not updated" });
        }

        return res.status(200).json({ success: true, message:"Data is Successfully updated!", data: updateUser });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};



export const userDelete = async (req, res) => {
    const id = req.params.id;

    try{
          const userdelete = await User.findByIdAndDelete(id);
          if(!userdelete)
          {
            return res.status(404).json({message: "User does not exist!"});
          }

          return res.status(200).json({success:true, message:'User Successfully deleted!'});
    }
    catch(err)
    {
        return res.status(500).json({message : err.message});
    }
}

export const statusChange = async (req, res) =>{
    const id = req.params.id;
   try{
         const user = await User.findById(id);
         if(!user) return res.status(404).json({message: "User not found"});
         
         const data = {
             status: !user.status  //if status is true then change to false else change to true
         }
         const updateUser = await User.findByIdAndUpdate(id, data, {new: true});
         if(!updateUser)
         {
             return res.status(404).json({message: "User not updated"});
         }
         return res.status(200).json({sucess: true, message:"Status has been Successfully changed.", data: updateUser});
   }
   catch(err)
   {
    return res.status(500).json({message: err.message});  
   }
}