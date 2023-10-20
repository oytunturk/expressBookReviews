const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    for(var i=0; i<regd_users.length; i++) {
        if(regd_users[i].username==username) { 
            return true; 
        }
    }
    return false;
}

const pwd = (username)=>{ //returns string
    //returns password of a registered user
    for(var i=0; i<regd_users.length; i++) {
        if(regd_users[i].username==username) { 
            return regd_users[i].password; 
        }
    }
    return "";
}

const authenticatedUser = (username,password)=>{ //returns boolean
    //write code to check if username and password match the one we have in records.
    if(isValid(username)) {
        userpassword = getPassword(username);
        if(userpassword.length>0) {
            if(userpassword==password) {
                return true;
            }
        }
    }
    return false;
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
