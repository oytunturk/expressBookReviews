const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.use(express.json());

public_users.post("/register", (req,res) => {
    //Write your code here
    const username = req.body.username;
    const password = req.body.password;
    if (!username || !password) {
        res.status(422).json({ error: "Please include username and password in your POST request"})
    }
    if (username && password) {
      if (!isValid(username)) {
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});
     }
    }
    return res.status(404).json({message: `NOT ABLE to register user --> username=${username} password=${password}`});
});

// Get the book list available in the shop
//public_users.get('/',function (req, res) {
  //Write your code here
    //return res.status(300).json({message: "Yet to be implemented"});
    //res.send(JSON.stringify({books},null,4));
//});

let myPromise = new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve(JSON.stringify({books},null,4))
    },6000)})

public_users.get('/',function (req, res) {
    //Write your code here
      //return res.status(300).json({message: "Yet to be implemented"});
      //res.send(JSON.stringify({books},null,4));
      myPromise.then((successMessage) => {
        res.send(successMessage)
      })
});

// Get book details based on ISBN
public_users.get('/books/isbn/:isbn',function (req, res) {
    const get_books_isbn = new Promise((resolve, reject) => {
    const isbn = req.params.isbn;
    // console.log(isbn);
        if (req.params.isbn <= 10) {
        resolve(res.send(books[isbn]));
    }
        else {
            reject(res.send('ISBN not found'));
        }
    });
    get_books_isbn.
        then(function(){
            console.log("Promise for Task 11 is resolved");
   }).
        catch(function () { 
                console.log('ISBN not found');
  });

});

// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
    //const authorName = req.params.author;
    //let filtered_books = Object.values(books).filter((book) => book.author === authorName);
    //res.send(filtered_books);

    const get_books_author = new Promise((resolve, reject) => {
    const author = req.params.author;
    // console.log(author);
    if (req.params.author.length > 0) {
        resolve(res.send(books[author]));
    } else {
        reject(res.send('Author not found'));
    }
    });
    get_books_author.then(function(){
        console.log("Promise for Task 12 is resolved");
    }).catch(function () { 
        console.log('Author not found');
    });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
  //const title = req.params.title;
  //let filtered_books = Object.values(books).filter((book) => book.title === title);
  //res.send(filtered_books);
    const get_books_title = new Promise((resolve, reject) => {
    const title = req.params.title;
    // console.log(title);
    if (req.params.title.length > 0) {
        resolve(res.send(books[title]));
    } else {
        reject(res.send('Title not found'));
    }
    });
    get_books_title.then(function(){
        console.log("Promise for Task 13 is resolved");
    }).catch(function () { 
        console.log('Title not found');
    });
});

//  Get book review
//public_users.get('/review/:isbn',function (req, res) {
  //Write your code here
  //return res.status(300).json({message: "Yet to be implemented"});
   // const isbn = req.params.isbn;
   // let filtered_books = Object.values(books).filter((book) => book.isbn === isbn);
   // res.send(filtered_books[0].reviews);
//});

public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    res.send(books[isbn]["reviews"])
  });

module.exports.general = public_users;
