"use strict";
const Joi = require('joi');

exports.postplayersSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).required(),
    username: Joi.string().min(6).lowercase().required()
});