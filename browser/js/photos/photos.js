app.config(function ($stateProvider) {

    $stateProvider.state('photos', {
        url: '/photos',
        templateUrl: '/js/photos/photos.html',
        controller: function ($scope, PhotoFactory) {
          PhotoFactory.getPhotos()
            .then(function(photos){
              $scope.photos = photos;
            });
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

app.factory('PhotoFactory', function ($http, Upload) {

    var getPhotos = function () {
        return $http.get('/api/photos').then(function (response) {
            return response.data;
        });
    };

    var get = function (id) {
        return $http.get('/api/photos/' + id).then(function (response) {
            return response.data;
        });
    };

    var remove = function (photo) {
        return $http.delete('/api/photos/' + photo._id).then(function (response) {
            return response.data;
        });
    };

    var create = function (photo, file) {
      return Upload.upload({
        url: '/api/photos',
        method: 'POST',
        data: { file: file, photo: photo } 
      })
      .then(function(result){
        return result.data;
      });
    };

    var update = function (photo, file) {
      return Upload.upload({
        url: '/api/photos/' + photo._id,
        method: 'PUT',
        data: { file: file, photo: photo } 
      })
      .then(function(result){
        return result.data;
      });
    };

    return {
        get: get,
        getPhotos: getPhotos,
        create: create,
        update: update,
        remove: remove 
    };

});
