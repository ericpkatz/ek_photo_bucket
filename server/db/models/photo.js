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

schema.pre('save', function (next) {
  console.log('TO DO - write this path to s3', this.url);
  console.log(this);
  next();

});

mongoose.model('Photo', schema);
