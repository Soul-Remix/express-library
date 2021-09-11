const Book = require('../models/book');
const Author = require('../models/author');
const Genre = require('../models/genre');
const BookInstance = require('../models/bookinstance');
const { NotExtended } = require('http-errors');

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

const book_detail = function (req, res) {
  res.send('Not Implemented yet');
};

const book_create_get = function (req, res) {
  res.send('Not Implemented yet');
};

const book_create_post = function (req, res) {
  res.send('Not Implemented yet');
};

const book_delete_get = function (req, res) {
  res.send('Not Implemented yet');
};

const book_delete_post = function (req, res) {
  res.send('Not Implemented yet');
};

const book_update_get = function (req, res) {
  res.send('Not Implemented yet');
};

const book_update_post = function (req, res) {
  res.send('Not Implemented yet');
};

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
