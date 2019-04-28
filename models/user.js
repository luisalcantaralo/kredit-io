const config = require('config');
const jwt = require('jsonwebtoken'); 
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255
  },
  lastname: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 255
},
  email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
      unique: true
  },
  password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 1024
},
zipcode: {
  type: String,
  required: true,
  minlength: 5,
  maxlength: 1024
},
birthdate: {
  type: String,
  required: true,
  minlength: 5,
  maxlength: 1024
},
monthlyIncome: {
  type: String,
  required: true,
  minlength: 5,
  maxlength: 1024
},
applications: {
  type: []
},
  isAdmin: {
    type: Boolean
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
  return token;
}
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(255).required(),
    lastname: Joi.string().min(5).max(255).required(),
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
    phone: Joi.string().min(5).max(255).required(),
    zipcode: Joi.string().min(5).max(255).required(),
    birthdate: Joi.string().required(),
    monthlyIncome: Joi.string().min(5).max(255).required(),

  };

  return Joi.validate(user, schema);
}

exports.User = User; 
exports.validate = validateUser;