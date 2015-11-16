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
  var path = require('path');
  var fileName = path.basename(this.url);
  console.log(fileName);
  var AWS = require('aws-sdk');
  var s3 = new AWS.S3({
    accessKeyId: require('../../env').AWS_ACCESS_KEY, 
    secretAccessKey: require('../../env').AWS_ACCESS_KEY_SECRET,
    params: {Bucket: 'ek_photo_bucket', Key: fileName}
  });
  var fs = require('fs');
  var that = this;
  fs.readFile(this.url, function(err, data){
    s3.createBucket(function(err) {
      if (err) { next(err); }
      else {
        s3.upload({Body: data, ACL: 'public-read'}, function() {
          that.url = path.join('https://s3.amazonaws.com/ek_photo_bucket', fileName);

          next();
        });
      }
    });
  });
  /*
  console.log('TO DO - write this path to s3', this.url);
  console.log(this);
  next();
  */

});

mongoose.model('Photo', schema);
