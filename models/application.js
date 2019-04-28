const Joi = require('joi');
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  dateOfCreation: {
    type: String,
    maxlength: 50
  },
  SAT: {
    type: String,
    required: true,
    maxlength: 50
  },
  BURO: {
    type: String,
    required: true,
    maxlength: 50
  },
  quantity: {
    type: String,
    required: true,
    maxlength: 50
  },
  monthsToPay: {
    type: String,
    required: true,
    maxlength: 50
  },
  monthlyIncome: {
    type: String,
    required: true,
    maxlength: 50
  },
  result: {
    type: Object,
    maxlength: 1024
  },
});

const Application = mongoose.model('Application', applicationSchema);

function validateApplication(application) {
  const schema = {
    dateOfCreation: Joi.string().min(5).max(255).required(),
    SAT: Joi.string().max(100).required(),
    BURO: Joi.string().max(100).required(),
    quantity: Joi.string().max(255).required(),
    monthsToPay: Joi.string().max(255).required(),
    monthlyIncome: Joi.string().max(255).required(),

  };

  return Joi.validate(application, schema);
}

exports.applicationSchema = applicationSchema;
exports.Application = Application; 
exports.validate = validateApplication;