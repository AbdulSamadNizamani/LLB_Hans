// import { User } from "../Models/UserSchema.js";
// import jwt from 'jsonwebtoken';
// import express from 'express';
// import Connect from '../db/Connect.js';
const  User  = require("../Models/UserSchema.js");
const jwt = require("jsonwebtoken");
const express = require("express");
const Connect = require("../db/Connect.js");

const managerrouter = express.Router();
const manager = async (req, res, next) => {
  try {
    await Connect();
    const token = req.cookies.token;
    if (!token) {
      console.log("No token found in cookies!"); // Debugging
      return res.status(400).json({
        message: 'Token is not provided'
      });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }
    if (user.role !== 'Manager' && user.role !== 'Admin') {
      return res.status(401).json({
        message: 'User is neither Manager nor Admin'
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      message: 'Invalid or expired token'
    });
  }
};

// ✅ Include the role in the response
managerrouter.get('/managerrole', manager, (req, res) => {
  console.log("User Role:", req.user.role); // Debugging
  res.status(200).json({
    message: 'Identify Successfully',
    role: req.user.role
  });
});
// export default managerrouter;
module.exports = managerrouter;