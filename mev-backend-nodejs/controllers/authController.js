const User = require("../models/authModel.js");
const bcryptjs=require('bcryptjs');


const signup= async(req , res , next)=>{
const {username , email , password}=req.body;
const hashPassword=bcryptjs.hashSync(password , 10)
const newUser=new User({username , email ,password:hashPassword});
try {

    await newUser.save()
res.status(201).json({messasge:"User Created Successfully"})

} catch (error) {
    res.status(500).json(error.message)
}

 };

module.exports = {
    signup,
  };
  