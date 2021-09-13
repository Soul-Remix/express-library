const Author = require('../models/author');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator');

const author_list = async function (req, res, next) {
  try {
    const data = await Author.find().sort([['family_name', 'ascending']]);
    res.render('author-list', { title: 'Author List', data: data });
  } catch (err) {
    return next(err);
  }
};

const author_detail = async function (req, res, next) {
  try {
    const id = req.params.id;
    const data = await Author.findById(id);
    if (!data) {
      const err = new Error('Author not found');
      err.status = 404;
      return next(err);
    }
    const books = await Book.find({ author: id }, 'title summary');
    res.render('author-detail', { title: 'Author List', data, books });
  } catch (err) {
    return next(err);
  }
};

const author_create_get = function (req, res) {
  res.render('author-form', { title: 'Create Author' });
};

const author_create_post = [
  body('first_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('First name must be specified.')
    .isAlphanumeric()
    .withMessage('First name has non-alphanumeric characters.'),
  body('family_name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Family name must be specified.')
    .isAlphanumeric()
    .withMessage('Family name has non-alphanumeric characters.'),
  body('date_of_birth', 'Invalid date of birth')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  body('date_of_death', 'Invalid date of death')
    .optional({ checkFalsy: true })
    .isISO8601()
    .toDate(),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('author-form', {
        title: 'Create Author',
        author: req.body,
        errors: errors.array(),
      });
    } else {
      try {
        const author = new Author({
          first_name: req.body.first_name,
          family_name: req.body.family_name,
          date_of_birth: req.body.date_of_birth,
          date_of_death: req.body.date_of_death,
        });
        await author.save();
        res.redirect(author.url);
      } catch (err) {
        return next(err);
      }
    }
  },
];

const author_delete_get = async function (req, res, next) {
  try {
    const author = await Author.findById(req.params.id);
    const books = await Book.find({ author: req.params.id });
    if (!author) {
      res.redirect('catalog/author');
    } else {
      res.render('author-delete', { title: 'Delete Author', author, books });
    }
  } catch (err) {
    return next(err);
  }
};

const author_delete_post = async function (req, res, next) {
  try {
    const id = req.params.id;
    const author = await Author.findById(id);
    const books = await Book.find({ author: id });
    if (books.length > 0) {
      res.render('author-delete', { title: 'Delete Author', author, books });
    } else {
      await Author.findByIdAndDelete(id);
      res.redirect('catalog/author');
    }
  } catch (err) {
    return next(err);
  }
};

const author_update_get = function (req, res) {
  res.send('Not Implemented yet');
};

const author_update_post = function (req, res) {
  res.send('Not Implemented yet');
};

module.exports = {
  author_list,
  author_detail,
  author_create_get,
  author_create_post,
  author_delete_get,
  author_delete_post,
  author_update_get,
  author_update_post,
};
