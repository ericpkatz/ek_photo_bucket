'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');

var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.get('/', ensureAuthenticated, function (req, res) {
  Photo.find()
    .then(function(photos){
      res.send(photos);
    });
});

router.get('/:id', ensureAuthenticated, function (req, res) {
  Photo.findById(req.params.id)
    .then(function(photo){
      res.send(photo);
    });
});

router.post('/', ensureAuthenticated, function (req, res) {
  var photo = new Photo(req.body);
  photo.save()
    .then(function(photo){
      res.send(photo);
    });
});

router.put('/:id', ensureAuthenticated, function (req, res) {
  Photo.findById(req.params.id)
    .then(function(photo){
      _.extend(photo, req.body);
      return photo.save();
    })
  .then(function(photo){
    res.send(photo);
  
  });
});
