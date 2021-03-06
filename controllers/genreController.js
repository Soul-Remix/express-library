const Genre = require('../models/genre');
const Book = require('../models/book');
const { body, validationResult } = require('express-validator');

const genre_list = async function (req, res, next) {
  try {
    const data = await Genre.find().sort([['name', 'ascending']]);
    res.render('genre-list', { title: 'Genre List', data: data });
  } catch (err) {
    return next(err);
  }
};

const genre_detail = async function (req, res, next) {
  try {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (genre.genre === null) {
      const err = new Error('Genre not found');
      err.status = 404;
      return next(err);
    }
    const data = await Book.find({ genre: id });
    res.render('genre-detail', { title: 'Genre Detail', genre, data });
  } catch (err) {
    return next(err);
  }
};

const genre_create_get = function (req, res) {
  res.render('genre-form', { title: 'Create Genre' });
};

const genre_create_post = [
  body('name', 'Genre name required').trim().isLength({ min: 1 }).escape(),
  async (req, res, next) => {
    const errors = validationResult(req);
    const genre = new Genre({
      name: req.body.name,
    });
    if (!errors.isEmpty()) {
      res.render('genre-form', {
        title: 'Create Genre',
        genre,
        errors: errors.array(),
      });
    } else {
      try {
        const found = await Genre.findOne({ name: req.body.name });
        if (found) {
          res.redirect(found.url);
        } else {
          await genre.save();
          res.redirect(genre.url);
        }
      } catch (err) {
        return next(err);
      }
    }
  },
];

const genre_delete_get = async function (req, res, next) {
  try {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    const books = await Book.find({ genre: id });
    if (!genre) {
      res.redirect('/catalog/genres');
    } else {
      res.render('genre-delete', { title: 'Delete genre', genre, books });
    }
  } catch (err) {
    return next(err);
  }
};

const genre_delete_post = async function (req, res, next) {
  try {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    const books = await Book.find({ genre: id });
    if (books.length) {
      res.render('genre-delete', { title: 'Delete genre', genre, books });
    } else {
      await Genre.findByIdAndDelete(id);
      res.redirect('/catalog/genres');
    }
  } catch (err) {
    return next(err);
  }
};

const genre_update_get = async function (req, res, next) {
  try {
    const id = req.params.id;
    const genre = await Genre.findById(id);
    if (!genre) {
      const err = new Error('Genre not found');
      err.status = 400;
      next(err);
    } else {
      res.render('genre-form', genre);
    }
  } catch (err) {
    return next(err);
  }
};

const genre_update_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Genre name is required'),
  async (req, res, next) => {
    errors = validationResult(req);
    const genre = new Genre({
      name: req.body.name,
      _id: req.params.id,
    });
    if (!errors.isEmpty()) {
      res.render('genre-form', {
        title: 'Update Genre',
        genre,
        errors: errors.array(),
      });
    } else {
      await Genre.findByIdAndUpdate(req.params.id, genre);
      res.redirect(genre.url);
    }
  },
];

module.exports = {
  genre_list,
  genre_detail,
  genre_create_get,
  genre_create_post,
  genre_delete_get,
  genre_delete_post,
  genre_update_get,
  genre_update_post,
};
