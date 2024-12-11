const Books = require('../models/Book');

exports.addBook = async (req, res) => {
  const { bookName, subject, writer, class: bookClass, publishedYear, creatingDate } = req.body;

  try {
    // Validate the request data
    if (!bookName || !subject || !writer || !bookClass || !publishedYear || !creatingDate) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new book document
    const newBook = new Books({
      idNo: Date.now(),
      bookName,
      subject,
      writer,
      class: bookClass,
      publishedYear,
      creatingDate,
    });

    // Save the book to the database
    const savedBook = await newBook.save();

    // Return a success response
    res.status(201).json({ message: 'Book added successfully!', book: savedBook });
  } catch (error) {
    // Handle unexpected errors
    console.error('Error saving book:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
};


// Get all books
exports.getBooks = async (req, res) => {
  try {
    const books = await Books.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a book by ID
exports.updateBooks = async (req, res) => {
  try {
    const { id } = req.params; // Get book ID from request parameters
    const updatedData = req.body; // Get updated book data from request body

    // Assuming a database model like Mongoose or Sequelize
    const updatedBook = await Books.findByIdAndUpdate(id, updatedData, {
      new: true, // Return the updated book
      runValidators: true, // Ensure data validation
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      book: updatedBook,
    });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).json({ message: "Failed to update book", error });
  }
};


// Delete a book by ID
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params; // Get book ID from request parameters

    const deletedBook = await Books.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      book: deletedBook, // Optional: Return the deleted book
    });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ message: "Failed to delete book", error });
  }
};

