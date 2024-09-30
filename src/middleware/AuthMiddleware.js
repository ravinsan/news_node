import jwt from "jsonwebtoken";

export const AuthMiddleware = async (req, res, next) =>{

    
     try{
        // console.log(req.cookies);
        const cookie_token = req.cookies.token;                        // Cookie Token  
        const header_token = req.headers.authorization.split(" ")[1]; // Header Token

        const usedToken = cookie_token || header_token;

        if(!usedToken){
            return res.status(401).json({message: "Unauthorized"})
        }

        const decoded = jwt.verify(usedToken, process.env.JWT_SECRET);
        req.user = decoded;
        next();
        
     }
     catch(err){
        
        if(err.name === "TokenExpiredError"){
            return res.status(401).json({message: "Not Authorized"});
        }
        return res.status(401).json({message: "Unauthorized"})
     }
}