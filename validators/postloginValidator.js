"use strict";
const Joi = require('joi');

exports.postloginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required()
});