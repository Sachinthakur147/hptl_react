const express = require("express");

const authController = require("../../Controller/auth/login/test_login");


const loggedin = express.Router();


const verifyToken = (req, res, next) => {
     const token = req.headers.authorization?.split(" ")[1];
     console.log(token)
     // if (!token) return res.status(401).json({ error: "Unauthorized" });
     if (!token) {
          res.json("unAuthrization");
          // console.log(err.sqlMessage)
     }
     jwt.verify(token, "your_jwt_secret", (err, decoded) => {
       if (err) {
          console.log(err.sqlMessage)
          res.json(err.sqlMessage);
       } 
       req.email = decoded.email;
       next();
     });
   };

//    loggedin.get("/dashboard", verifyToken, (req, res) => {
//      // Authorized route logic
//      res.json({ message: "Welcome to the dashboard!" });
//    });
loggedin.post("/signup", authController.signup);
loggedin.post("/login", verifyToken,authController.login);

module.exports = {loggedin};