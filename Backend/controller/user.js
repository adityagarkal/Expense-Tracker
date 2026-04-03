const express = require("express"); 
const User = require("../models/user");



 async function handleRegisterUser(req, res){

    const { name, email, password } = req.body;

    // 1️⃣ Check if all fields are provided 
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }  

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({ email }); 

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }


    // 3 Save to database 
    const result = await User.create({
        name,
        email,
        password
    });
    console.log("result", result);
    
    return res.status(201).json({ message:"User registered successfully"})

}

async function handleLoginUser(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const user = await User.findOne({ email }); 

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    })
    .then(console.log("success")
    )
}

module.exports = {
  handleRegisterUser,
  handleLoginUser,
}