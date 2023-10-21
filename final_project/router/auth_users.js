const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
    //write code to check is the username is valid
    for(var i=0; i<users.length; i++) {
        if(users[i].username==username) { 
            return true; 
        }
    }
    return false;
}

const getPassword = (username)=>{ //returns string
    //returns password of a registered user
    for(var i=0; i<users.length; i++) {
        if(users[i].username==username) { 
            return users[i].password; 
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
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
      return res.status(404).json({message: "Error logging in"});
  }
  if (authenticatedUser(username,password)) {
    let accessToken = jwt.sign({
      data: password
    }, 'access', { expiresIn: 60 * 60 });
    req.session.authorization = {
      accessToken,username
  }
  return res.status(200).send("User successfully logged in");
  } else {
    return res.status(208).json({message: "Invalid Login. Check username and password"});
}});

// Add a book review
//regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
//  return res.status(300).json({message: "Yet to be implemented"});
//});

regd_users.put("/auth/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    let filtered_book = books[isbn]
    if (filtered_book) {
        let review = req.query.review;
        let reviewer = req.session.authorization['username'];
        if(review) {
            filtered_book['reviews'][reviewer] = review;
            books[isbn] = filtered_book;
        }
        res.send(`The review for the book with ISBN  ${isbn} has been added/updated.`);
    }
    else{
        res.send("Unable to find this ISBN!");
    }
  });

  module.exports.authenticated = regd_users;
  module.exports.isValid = isValid;
  module.exports.users = users;