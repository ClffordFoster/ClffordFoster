"use strict";
const Joi = require('joi');

exports.deleteplayersSchema = Joi.object({
	playerID: Joi.string().guid({version:'uuidv4'}).required()
});