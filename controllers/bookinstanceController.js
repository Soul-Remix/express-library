const BookInstance = require('../models/bookinstance');

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

const bookinstance_detail = function (req, res) {
  res.send('Not Implemented yet');
};

const bookinstance_create_get = function (req, res) {
  res.send('Not Implemented yet');
};

const bookinstance_create_post = function (req, res) {
  res.send('Not Implemented yet');
};

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
