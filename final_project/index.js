const express = require('express');
const jwt = require('jsonwebtoken');
const session = require('express-session')
const customer_routes = require('./router/auth_users.js').authenticated;
const genl_routes = require('./router/general.js').general;

const app = express();

const authenticatedUser = (username,password)=>{
    let validusers = auth_users.filter((user)=>{
      return (user.username === username && user.password === password)
    });
    if(validusers.length > 0){
      return true;
    } else {
      return false;
    }
}

app.use("/customer",session({secret:"fingerprint_customer",resave: true, saveUninitialized: true}))
 
app.use("/customer/auth/*", function auth(req,res,next){
    let token = req.session.authorization;
    if(token) {
        token = token['accessToken'];
        jwt.verify(token, "access",(err,user)=>{
            if(!err){
                req.user = user;
                next();
            }
            else{
                return res.status(403).json({message: "Customer not authenticated"})
            }
         });
     } else {
         return res.status(403).json({message: "Customer not logged in"})
     }
 });

const PORT =5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT,()=>console.log("Server is running"));