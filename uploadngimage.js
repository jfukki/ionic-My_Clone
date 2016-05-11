imageApp.controller('SecureController', function($scope, $ionicHistory, $firebaseArray, $cordovaCamera) {

    
    
    $ionicHistory.clearHistory();

    var fb = new Firebase('https://jfuki-posts.firebaseio.com/');
    
    //$scope.images = $firebaseArray(fb);
    var syncArray = $firebaseArray(fb.child('images'));
    $scope.images = [];
      $scope.images = syncArray;
    
//
//    var fbAuth = fb.getAuth();
//    if(fbAuth) {
//        var userReference = fb.child('users/' + fbAuth.uid);
//        var syncArray = $firebaseArray(userReference.child('images'));
//        $scope.images = syncArray;
//    } else {
//        $state.go('firebase');
//    }

    $scope.upload = function() {
        var options = {
            quality : 75,
            destinationType : Camera.DestinationType.DATA_URL,
            sourceType : Camera.PictureSourceType.CAMERA,
            allowEdit : true,
            encodingType: Camera.EncodingType.JPEG,
            popoverOptions: CameraPopoverOptions,
            targetWidth: 500,
            targetHeight: 500,
            saveToPhotoAlbum: false
        };
        
        $cordovaCamera.getPicture(options).then(function(imageData) {
            syncArray.$add({image: imageData}).then(function() {
                alert('Image has been uploaded');
            });
        }, function(error) {
            alert.error(error);
        });
    }
    
    
    //Removin image
        $scope.removeImage = function(image){
        console.log('Enters the function');
        $scope.images.$remove(image);
      
    console.log('Leaves the function');
  };
    
   
    

});