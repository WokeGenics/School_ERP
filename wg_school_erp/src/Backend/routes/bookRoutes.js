const express = require('express');
const { addBook, getBooks, deleteBook, updateBooks } = require('../controllers/bookController');
const router = express.Router();

// Routes
router.post('/books', addBook);
router.get('/books', getBooks);
router.put('/books/:id', updateBooks)
router.delete('/books/:id', deleteBook);

module.exports = router;
