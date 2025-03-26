// import express from 'express';
// import { User } from '../Models/UserSchema.js';
// import jwt from 'jsonwebtoken';
// import Connect from '../db/Connect.js';
const express = require('express');
const User = require('../Models/UserSchema.js')
const jwt = require('jsonwebtoken');
const Connect = require('../db/Connect.js');

const adminrouter = express.Router();
const userfind = async (req, res, next) => {
  try {
    await Connect();
    const token = await req.cookies.token;
    if (!token) {
      res.status(400).json({
        message: 'Token is not provided'
      });
    }
    const decoded = await jwt.verify(token, process.env.SECRET_KEY);
    const id = decoded.id;
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({
        message: 'Not Found'
      });
    }
    if (user?.role !== 'Admin') {
      res.status(401).json({
        message: 'User is not a Admin'
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log(error);
  }
};
adminrouter.get('/adminrole', userfind, (req, res) => {
  res.status(200).json({
    message: 'User is Admin'
  });
});

// import express from 'express';
// import { User } from '../Models/UserSchema.js';
// import jwt from 'jsonwebtoken';
// import cookieParser from 'cookie-parser'; // ⬅️ Ensure this is used in your app.js

// const adminrouter = express.Router();

// // Middleware to check if user is an admin
// const userfind = async (req, res, next) => {
//     try {
//         // ✅ Check if token exists
//         const token = req.cookies?.token;
//         if (!token) {
//             return res.status(400).json({ message: 'Token is not provided' });
//         }

//         // ✅ Verify token
//         const decoded = jwt.verify(token, process.env.SECRET_KEY);
//         const id = decoded.id;

//         // ✅ Find user by ID
//         const user = await User.findById(id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         // ✅ Check if user is an admin
//         if (user.role !== 'Admin') {
//             return res.status(403).json({ message: 'User is not an Admin' });
//         }

//         req.user = user; // Optional: Attach user to request for later use
//         next(); // ✅ Proceed to the next middleware
//     } catch (error) {
//         console.error('Error in userfind middleware:', error);
//         return res.status(500).json({ message: 'Internal server error' });
//     }
// };

// // ✅ Apply middleware to the route
// adminrouter.get('/adminrole', userfind, (req, res) => {
//     res.status(200).json({ message: 'User is Admin' });
// });

// export default adminrouter;
module.exports = adminrouter;