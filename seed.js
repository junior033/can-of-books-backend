'use strict';

const mongoose = require('mongoose');

require('dotenv').config();
mongoose.connect(process.env.DB_URL);

const Book = require('./models/books.js');

async function seed() {
  // title: { type: String, required: true },
  // description: { type: String, required: true },
  // status: { type: Boolean, required: true },

  await Book.create({
    title: 'Space',
    description: 'A book about the solar system',
    status: true,
    
  });

  console.log('Space was created!');

  await Book.create({
    title:'Javascript for Dummies',
    description: 'Teaches dummies how to program in Javascript',
    status: false,
    
  });

  console.log('JS was created');

  await Book.create({
    title: 'How to Bribe Your Instructor',
    description: 'How to get an Easy A',
    status: true,
    
  });
  
  console.log('Bribes was created');

  mongoose.disconnect();
}

seed();