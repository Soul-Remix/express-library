const Author = require('../models/author');

const author_list = async function (req, res, next) {
  try {
    const data = await Author.find().sort([['family_name', 'ascending']]);
    res.render('author-list', { title: 'Author List', data: data });
  } catch (err) {
    return next(err);
  }
};

const author_detail = function (req, res) {
  res.send('Not Implemented yet');
};

const author_create_get = function (req, res) {
  res.send('Not Implemented yet');
};

const author_create_post = function (req, res) {
  res.send('Not Implemented yet');
};

const author_delete_get = function (req, res) {
  res.send('Not Implemented yet');
};

const author_delete_post = function (req, res) {
  res.send('Not Implemented yet');
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
