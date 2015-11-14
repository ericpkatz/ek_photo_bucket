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

app.factory('PhotoFactory', function ($http) {

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

    var create = function (photo) {
        return $http.post('/api/photos', photo).then(function (response) {
            return response.data;
        });
    };

    var update = function (photo) {
        return $http.put('/api/photos/' + photo._id, photo).then(function (response) {
            return response.data;
        });
    };

    return {
        get: get,
        getPhotos: getPhotos,
        create: create,
        update: update
    };

});
