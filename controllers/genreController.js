const Genre = require('../models/genre');
const Book = require('../models/book');

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
  res.send('Not Implemented yet');
};

const genre_create_post = function (req, res) {
  res.send('Not Implemented yet');
};

const genre_delete_get = function (req, res) {
  res.send('Not Implemented yet');
};

const genre_delete_post = function (req, res) {
  res.send('Not Implemented yet');
};

const genre_update_get = function (req, res) {
  res.send('Not Implemented yet');
};

const genre_update_post = function (req, res) {
  res.send('Not Implemented yet');
};

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
