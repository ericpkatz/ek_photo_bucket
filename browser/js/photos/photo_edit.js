app.config(function ($stateProvider) {

    $stateProvider.state('photos.edit', {
        url: '/:id',
        templateUrl: '/js/photos/photo_edit.html',
        controller: function ($scope, $stateParams, $state, PhotoFactory, Upload) {
          console.log(Object.keys(Upload));
          PhotoFactory.get($stateParams.id)
            .then(function(photo){
              $scope.photo = photo;

            });
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

