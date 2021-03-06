const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');
const { body, validationResult } = require('express-validator');

const index = async function (req, res, next) {
  try {
    const book_count = await Book.countDocuments({});
    const book_instance_count = await BookInstance.countDocuments({});
    const book_instance_available_count = await BookInstance.countDocuments({
      status: 'available',
    });
    const author_count = await Author.countDocuments({});
    const genre_count = await Genre.countDocuments({});
    const data = {
      book_count,
      book_instance_count,
      book_instance_available_count,
      author_count,
      genre_count,
    };
    res.render('index', { title: 'Library Home', data: data });
  } catch (err) {
    return next(err);
  }
};

const book_list = async function (req, res, next) {
  try {
    const data = await Book.find()
      .populate('author')
      .sort([['title', 'ascending']]);
    res.render('book-list', { title: 'Book List', data: data });
  } catch (err) {
    return next(err);
  }
};

const book_detail = async function (req, res, next) {
  try {
    const id = req.params.id;
    const data = await Book.findById(id).populate('author').populate('genre');
    const instance = await BookInstance.find({ book: id });
    if (data.book === null) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err);
    }
    res.render('book-detail', { title: 'Book Detail', data, instance });
  } catch (err) {
    return next(err);
  }
};

const book_create_get = async function (req, res, next) {
  try {
    const author = await Author.find();
    const genre = await Genre.find();
    res.render('book-form', { title: 'Create Book', author, genre });
  } catch (err) {
    return next(err);
  }
};

const book_create_post = [
  (req, res, next) => {
    if (!(req.body.genre instanceof Array)) {
      if (typeof req.body.genre === 'undefined') req.body.genre = [];
      else req.body.genre = new Array(req.body.genre);
    }
    next();
  },
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Title must not be empty'),
  body('author')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Author must not be empty'),
  body('summary')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Summary must not be empty'),
  body('isbn')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('ISBN must not be empty'),
  body('genre.*').escape(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const book = new Book({
        title: req.body.title,
        summary: req.body.summary,
        author: req.body.author,
        isbn: req.body.isbn,
        genre: req.body.genre,
      });
      if (!errors.isEmpty()) {
        const author = await Author.find();
        const genre = await Genre.find();
        res.render('book-form', { title: 'Create Book', author, genre, book });
      } else {
        await book.save();
        res.redirect(book.url);
      }
    } catch (err) {
      return next(err);
    }
  },
];

const book_delete_get = async function (req, res, next) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    const bookinstance = await BookInstance.find({ book: id });
    if (!book) {
      res.redirect('/catalog/books');
    } else {
      res.render('book-delete', { title: 'Delete book', book, bookinstance });
    }
  } catch (err) {
    return next(err);
  }
};

const book_delete_post = async function (req, res, next) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id);
    const bookinstance = await BookInstance.find({ book: id });
    if (bookinstance.length > 0) {
      res.render('book-delete', { title: 'Delete book', book, bookinstance });
    } else {
      await Book.findByIdAndDelete(id);
      res.redirect('/catalog/books');
    }
  } catch (err) {
    return next(err);
  }
};

const book_update_get = async function (req, res) {
  try {
    const id = req.params.id;
    const book = await Book.findById(id).populate('author').populate('genre');
    const author = await Author.find();
    const genre = await Genre.find();
    if (!book) {
      const err = new Error('Book not found');
      err.status = 404;
      return next(err);
    } else {
      res.render('book-form', { title: 'Update Book', book, author, genre });
    }
  } catch (err) {
    return next(err);
  }
};

const book_update_post = [
  body('title')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Title must not be empty'),
  body('author')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Author must not be empty'),
  body('summary')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Summary must not be empty'),
  body('isbn')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('ISBN must not be empty'),
  body('genre.*').escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const book = new Book({
      title: req.body.title,
      summary: req.body.summary,
      author: req.body.author,
      isbn: req.body.isbn,
      genre: typeof req.body.genre === 'undefined' ? [] : req.body.genre,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      const author = await Author.find();
      const genre = await Genre.find();
      res.render('book-form', {
        title: 'Update Book',
        book,
        author,
        genre,
        errors: errors.array(),
      });
    } else {
      await Book.findByIdAndUpdate(req.params.id, book);
      res.redirect(book.url);
    }
  },
];

module.exports = {
  index,
  book_list,
  book_detail,
  book_create_get,
  book_create_post,
  book_delete_get,
  book_delete_post,
  book_update_get,
  book_update_post,
};
