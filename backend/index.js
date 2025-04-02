// import express from 'express';
// import bodyParser from 'body-parser';
// import cors from 'cors';
// import { config } from 'dotenv';
// import cookieParser from 'cookie-parser';
// import router from './routers/user.js';
// import passport from 'passport';
// import session from 'express-session';
// import cloudinary from 'cloudinary';
// import { User } from './Models/UserSchema.js';
// import jwt from 'jsonwebtoken';
// import { Strategy } from 'passport-google-oauth2';
// import nodemailer from 'nodemailer';
// import adminrouter from './routers/Admin.js';
// import managerrouter from './routers/Manager.js';
// import uploadrouter from './routers/UploadNotes.js';
// import postrouter from './routers/Posts.js';
// import videorouter from './routers/Videopost.js';
// import Connect from './db/Connect.js';
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const router = require('./routers/user.js');
const passport = require('passport');
const session = require('express-session');
const cloudinary = require('cloudinary');
const  User  = require('./Models/UserSchema.js');
const jwt = require('jsonwebtoken');
const { Strategy } = require('passport-google-oauth2');
const nodemailer = require('nodemailer');
const adminrouter = require('./routers/Admin.js');
const managerrouter = require('./routers/Manager.js');
const uploadrouter = require('./routers/UploadNotes.js');
const postrouter = require('./routers/Posts.js');
const videorouter = require('./routers/Videopost.js');
const Connect = require('./db/Connect.js');

// Load environment variables
dotenv.config({ path: './.env.local'});

// config({
//   path: './.env.local'
// });
const app = express();
app.use(cors({
  origin: process.env.VITE_FRONTEND_BASE_URL,
  methods: ["POST", "GET", "PATCH", "PUT", "DELETE"],
  credentials: true
}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY
});
// cloudinary.config({  // ✅ No need to write `.v2` again here
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_SECRET_KEY
// });
// Passport Google Strategy
passport.use(new Strategy({
  clientID: process.env.GOOGLE_CLIENTID,
  clientSecret: process.env.GOOGLE_SECRETID,
  callbackURL: `${process.env.VITE_NODE_BACKEND_URL}/auth/google/callback`,
  scope: ['email', 'profile']
}, async (accessToken, refreshToken, profile, done) => {
  try {
    await Connect();
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
        image: profile.photos[0].value
      });
      await user.save();
      
      let transporter = nodemailer.createTransport({
        service: "gmail",
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD
        }
      });
      
      let mailOptions = {
        from: process.env.EMAIL,
        to: profile.emails[0].value,
        subject: "Congratulations on Signing Up!",
        html: `<h1>Welcome to LLB Website, ${profile.displayName}!</h1><p>We're excited to have you join our platform.</p>`
      };
      
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) console.log(error);
        else console.log("Email sent: " + info.response);
      });
    }
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// Routes
app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

app.get('/auth/google/callback', passport.authenticate("google", { session: false }), async (req, res) => {
  try {
    const user = req.user;
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.SECRET_KEY, { expiresIn: '7d' });
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000
    });
    res.redirect(`${process.env.VITE_FRONTEND_BASE_URL}/`);
  } catch (error) {
    console.error("Error generating token:", error);
    res.redirect(`${process.env.VITE_FRONTEND_BASE_URL}/signup`);
  }
});
app.use('/auth', router);
app.use('/admin', adminrouter);
app.use('/manager', managerrouter);
app.use('/notes', uploadrouter);
app.use('/posts', postrouter);
app.use('/videos', videorouter);
// export default app;
module.exports = app;
