"use strict";
const Joi = require('joi');

exports.deleteplayersSchema = Joi.object({
	userID: Joi.string().guid({version:'uuidv4'}).required()
});