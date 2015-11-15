app.directive('photoForm', function(PhotoFactory, $state){
  return {
    scope: {
      photo: '='
    },
    restrict: 'E',
    templateUrl: '/js/photos/form.html',
    link: function($scope, element, attributes){
      $scope.save = function(){
        var method = 'create';
        if($scope.photo._id){
          method = 'update';
        }

        PhotoFactory[method]($scope.photo, $scope.file)
          .then(function(photo){
            $state.go('photos');
          });
      };
      $scope.remove = function(){
        PhotoFactory.remove($scope.photo)
          .then(function(photo){
            $state.go('photos');
          });
      };
    }
  };
});
