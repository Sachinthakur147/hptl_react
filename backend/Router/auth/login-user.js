const express = require('express');
const cors = require("cors");
const jwt = require("jsonwebtoken");

const {employee_datapost,employee_login,logout,getUserdata} =require('../../Controller/auth/login/login')



const user = express.Router();

const verifyUser = (req, res, next) => {
     const token = req.cookies.token;
     // console.log(req.cookies.token)
     if (!token) {
         return res.status(401).json({ Error: "You are not Authenticated" });
     } else {
         jwt.verify(token, "jwt-secret-key", (err, decoded) => {
             if (err) return res.status(401).json({ Error: "Token wrong" });
             console.log(decoded)
             req.email = decoded.email;
             req.emp_name = decoded.name; // Change req.regno to req.regID
             next();
         });
     }
 }; 

    user.post('/api/employee/login', employee_login)
    user.post('/hptl/user/register',employee_datapost)
    user.get('/hptl/user/logout', logout)
    user.get('/api/user/verify/getUserdata', verifyUser, getUserdata)

// user.get('/hptl/login/user',loginGet);
// user.get('/logout',logoutUser);
// user.post('/signup',signupUser);
// user.post('/login',loginAuth);



module.exports={user};