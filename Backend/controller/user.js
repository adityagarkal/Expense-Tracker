const express = require("express"); 
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



 async function handleRegisterUser(req, res){

    const { name, email, password } = req.body;

    // Check if all fields are provided 
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }  

    //  Check if user already exists
    const existingUser = await User.findOne({ email }); 

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // HASH PASSWORD

    const hashedPassword = await bcrypt.hash(password, 10);


    //  Save to database 
    const result = await User.create({
        name,
        email,
        password: hashedPassword
    });
    console.log("result", result);
    
    return res.status(201).json({ message:"User registered successfully"})

}


// LOGIN USER 


async function handleLoginUser(req, res) {
  const {email, password} = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" })
  }

  const user = await User.findOne({ email }); 

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    // COMPARE PASSWORD:


    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

     if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // GENERATE JWT TOKEN

    const token = jwt.sign(
      {
        id: user._id
      },
      "secretkey",
      {
        expiresIn: "7d"
      }
    );

    return res.status(200).json({
      message: "Login successful",
      token,
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