const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
  first_name: { type: String, maxlength: 100, required: true },
  family_name: { type: String, maxlength: 100, required: true },
  date_of_birth: { type: Date },
  date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function () {
  return this.first_name + ', ' + this.family_name;
});

AuthorSchema.virtual('lifespan').get(function () {
  let lifeTime = '';
  if (this.date_of_birth) {
    lifeTime += DateTime.fromJSDate(this.date_of_birth).toLocaleString(
      DateTime.DATE_MED
    );
  }
  lifeTime += ' - ';
  if (this.date_of_death) {
    lifeTime += DateTime.fromJSDate(this.date_of_death).toLocaleString(
      DateTime.DATE_MED
    );
  }
  return lifeTime;
});

AuthorSchema.virtual('url').get(function () {
  return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);
