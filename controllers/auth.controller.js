import { createAccessToken } from '../libs/jwt.js';
import User from '../models/userModel.js'
import {  v4 as uuidv4 } from 'uuid'
import bcrypt from 'bcryptjs'
import { TOKEN_SECRET } from '../config.js';
import jwt from 'jsonwebtoken'


export const register=async (req,res) => {
    
    try {
        const {email,password,username}=req.body;

        const userf=await User.query("email").eq(email).using("email").limit(1).exec();

         if(userf.length>0) return res.status(400).json(["the email already in use"]);

         const passwordHash=await bcrypt.hash(password,10);

        const newUser=new User({
            id: uuidv4(),
            username,
            email,
            password:passwordHash,
    })

    

    const userSaved= await newUser.save();

    const token=await createAccessToken({id: userSaved.id});

    res.cookie('token',token,{
      httpOnly: process.env.NODE_ENV !== "development",
      secure: 'auto',
      sameSite: "none",
    });

    res.json({
        id:userSaved.id,
        token,
        username:userSaved.username,
        email:userSaved.email,
        createdAt:userSaved.createdAt,
        updatedAt:userSaved.updatedAt
      })

    } catch (error) {
        res.status(500).json({message: error.message})
    }

}

export const login=async (req,res)=>{
  const {email,password}=req.body;

  try {
   const userFound= await User.query("email").eq(email).using("email").limit(1).exec();

  if(userFound.length==0) return res.status(400).json(["User not found"]);
  
  const isMatch=await bcrypt.compare(password,userFound[0].password);
  
  if(!isMatch) return res.status(400).json(["Incorrect credentials"]);

  const token=await createAccessToken({id: userFound[0].id});
  
  res.cookie('token',token,{
    httpOnly: process.env.NODE_ENV !== "development",
    secure: 'auto',
    sameSite: "none",
  });
  res.json({
    id:userFound[0].id,
    token:token,
    username:userFound[0].username,
    email:userFound[0].email,
    createdAt:userFound[0].createdAt,
    updatedAt:userFound[0].updatedAt
  })
    
  } catch (error) {
    res.status(500).json({message: error.message})
  }
}

export const logout=async (req,res)=>{
  res.cookie('token',"",{
    expires:new Date(0)
  })
  return res.sendStatus(200);
}


export const profile= async(req,res)=>{

  
  const  userFound=await User.get(req.body.id);

  if(!userFound) return res.status(400).json({message:"user not found"})
  
  return res.json({
    id:userFound.id,
    username:userFound.username,
    email:userFound.email,
    createdAt:userFound.createdAt,
    updatedAt:userFound.updatedAt
  })
  
}

export const verifyToken= async(req,res)=>{

  const {token}=req.cookies

  if(!token) return res.status(401).json({message:"Unauthorized no token found"})
  
  jwt.verify(token,TOKEN_SECRET,async (err,user)=>{

    if (err) return res.status(401).json({message:"Unauthorized token dont match"});


    const userFound= await User.get(user.id);
    if(!userFound) return res.status(401).json({message:"Unauthorized user dont found"});

    return res.json({
      id:userFound.id,
      username:userFound.username,
      emai:userFound.email
    })

  })
}