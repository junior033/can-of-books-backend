'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Book = require('./models/books.js');
const mongoose = require('mongoose');

const app = express();

//middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

const PORT = process.env.PORT || 3002;

//End point to post 
app.post('/books', postBook);

async function postBook(request, response, next){
  try {
    console.log(request.body)
    let createdBook = await Book.create(request.body);

    response.status(200).send(createdBook);
  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

//End point to delete a book, use a variable to capture the ID, must use :<variableName>
app.delete('/books/:bookID', deleteBooks);

async function deleteBooks(request, response, next){
  try {
    console.log(request.params);
    console.log(request.params.bookID);
    let id = request.params.bookID;
    
    await Book.findByIdAndDelete(id);

    response.status(200).send('Book Deleted');
  } catch (error) {
    next(error);
  }
}

app.get('/books', getBooks);

async function getBooks(request, response, next){
  try {
    let allBooks = await Book.find({}); 

    response.status(200).send(allBooks);

  } catch (error) {
    console.log(error.message);
    next(error);
  }
}

app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
});

// ERROR
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
