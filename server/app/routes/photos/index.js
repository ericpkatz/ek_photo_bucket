'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Photo = mongoose.model('Photo');
var multiparty = require('connect-multiparty');


var ensureAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};

router.use(multiparty());

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

router.delete('/:id', ensureAuthenticated, function (req, res) {
  Photo.findById(req.params.id)
    .then(function(photo){
      return photo.remove();
    })
    .then(function(photo){
      return res.sendStatus(204);
    });
});

router.post('/', ensureAuthenticated, function (req, res) {
  var photo = new Photo(req.body.photo);
  photo.url = req.files.file.path;
  photo.save()
    .then(function(photo){
      res.send(photo);
    });
});

router.put('/:id', ensureAuthenticated, function (req, res) {
  Photo.findById(req.params.id)
    .then(function(photo){
      _.extend(photo, req.body.photo);
      photo.url = req.files.file.path;
      return photo.save();
    })
  .then(function(photo){
    res.send(photo);
  
  });
});
