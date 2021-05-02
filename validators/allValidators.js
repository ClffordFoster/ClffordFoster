"use strict";

const VALIDATION_OPTIONS = {
	abortEarly: false,
	stripUnknown: true, 
	errors: {
		escapeHtml: true,
	}
};

// Require all of your validator files here.
const{postplayersSchema} = require("./postusersValidator");
const{postloginSchema} = require("./postloginValidator");
const{deleteplayersSchema} = require("./deleteusersValidator");
// require new schemas here

// Then add them to this object
const schemas = {
	postplayersSchema,
	postloginSchema,
	deleteplayersSchema,
    // Add new schemas here
};

// Now we can just require allValidators.js in index.js rather than having to require a bunch of files
// We can also include the validation options here so we don't have to copy/paste them into multiple files
exports.schemas = schemas;
exports.VALIDATION_OPTIONS = VALIDATION_OPTIONS;