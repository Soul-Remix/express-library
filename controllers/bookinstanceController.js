const BookInstance = require('../models/bookinstance');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator');

const bookinstance_list = async function (req, res, next) {
  try {
    const data = await BookInstance.find().populate('book');
    res.render('bookinstance-list', {
      title: 'Book Instance List',
      data: data,
    });
  } catch (err) {
    return next(err);
  }
};

const bookinstance_detail = async function (req, res, next) {
  try {
    const id = req.params.id;
    const data = BookInstance.findById(id).populate('book');
    if (!data) {
      const err = new Error('Book copy not found');
      err.status = 404;
      return next(err);
    }
    res.render('bookinstance-detail', { title: 'Book Instance Detail', data });
  } catch (err) {
    return next(err);
  }
};

const bookinstance_create_get = async function (req, res, next) {
  try {
    const books = await Book.find({}, 'title');
    res.render('bookinstance-form', { title: 'Create BookInstance', books });
  } catch (err) {
    return next(err);
  }
};

const bookinstance_create_post = [
  body('book', 'Book is required').trim().isLength({ min: 1 }).escape(),
  body('imprint')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Imprint is required'),
  body('status')
    .isIn('Available', 'Maintenance', 'Loaned', 'Reserved')
    .withMessage('Please choose a status')
    .escape(),
  body('due_back', 'Invalid date')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      const books = await Book.find({}, 'title');
      const bookinstance = new BookInstance({
        book: req.body.book,
        imprint: req.body.imprint,
        status: req.body.status,
        due_back: req.body.due_back,
      });
      if (!errors.isEmpty()) {
        res.render('bookinstance-form', {
          title: 'Create Bookinstance',
          books,
          bookinstance,
          errors: errors.array(),
        });
      } else {
        await bookinstance.save();
        res.redirect(bookinstance.url);
      }
    } catch (err) {
      return next(err);
    }
  },
];

const bookinstance_delete_get = function (req, res) {
  res.send('Not Implemented yet');
};

const bookinstance_delete_post = function (req, res) {
  res.send('Not Implemented yet');
};

const bookinstance_update_get = function (req, res) {
  res.send('Not Implemented yet');
};

const bookinstance_update_post = function (req, res) {
  res.send('Not Implemented yet');
};

module.exports = {
  bookinstance_list,
  bookinstance_detail,
  bookinstance_create_get,
  bookinstance_create_post,
  bookinstance_delete_get,
  bookinstance_delete_post,
  bookinstance_update_get,
  bookinstance_update_post,
};
