import type { Response, RequestHandler } from "express";
import User from "../models/user";
import type { RequestAuth } from "../middleware/authMiddleware";

const getMe : RequestHandler = async(req: RequestAuth, res: Response): Promise<void>=>{
  try{
    const user  = await User.findById(req.user._id).select("-password -__v");
    
    res.json(user);
  }catch(err : any){
    res.json({message: err.message});
  }
}

const updateMe : RequestHandler = async(req: RequestAuth, res: Response): Promise<void>=>{
  try{
    const updates = req.body;
    if(updates.role){
      delete updates.role;
    }
    if(updates.password){
      delete updates.password;
    }
    if(updates.email){
      delete updates.email;
    }
    const user = await User.findByIdAndUpdate(req.user._id, updates,{returnDocument  : 'after' ,runValidators  :true}).select("-password");
    if(user){
      res.json({
        success : true,
        message: "User has been updated successfully",
        data: {
          user
        }
      });
    }else{
      res.json({message: "Cannot update the data"});
    }
      
    
  }catch(err : any){
    res.json({message: err.meesage});
  }
}


export default {
  getMe,
  updateMe,
};