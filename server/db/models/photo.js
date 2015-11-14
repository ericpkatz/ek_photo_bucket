'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String
    },
    url: {
        type: String
    }
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.

schema.pre('save', function (next) {
    next();

});

mongoose.model('Photo', schema);
