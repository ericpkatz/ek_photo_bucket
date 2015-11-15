app.config(function ($stateProvider) {

    $stateProvider.state('photos.add', {
        url: '/add',
        templateUrl: '/js/photos/photo_add.html',
        controller: function ($scope, PhotoFactory, $state) {
        },
        // The following data.authenticate is read by an event listener
        // that controls access to this state. Refer to app.js.
        data: {
            authenticate: true
        }
    });

});

