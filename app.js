// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','firebase','ngCordova'])



.controller('myctrl',function($scope,$firebaseArray,$firebaseAuth,$cordovaCamera,$ionicHistory){
          
    $ionicHistory.clearHistory();
    
    var ref = new Firebase ('https://jfukki-myclone.firebaseio.com/');
    $scope.products = $firebaseArray(ref);
    
    
    var syncArray = $firebaseArray(ref.child('images'));
        $scope.images = [];
        $scope.images = syncArray;
    
    
     //Taking Camera pics and uplaoding to the firebase
    
 
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
    };
    
    
    
    
    
   // $scope.users=$firebaseAuth(ref.child('users'));
    
    $scope.post = function(name,des,cat,user_name,email,city,location,ph_no,product_price){
    
        var timestamp = new Date().valueOf();
        $scope.products.$add(
            {   
                id: timestamp,
                product_name:name,
                product_description:des,
                product_category:cat,
                user_name:user_name,
                user_email: email,
                user_city:city,
                user_location:location,
                user_phone:ph_no,
                product_price:product_price
                
          
            }
        );
        
        
        $scope.name = "";
        $scope.des = "";
        $scope.cat  = "";
        $scope.user_name  = "";
        $scope.email  = "";
        $scope.city  = "";
        $scope.location  = "";
        $scope.ph_no = "";
        $scope.product_price = "";
    };
        
        
 
    //Removing image
        $scope.removeImage = function(image){
        console.log('Enters the function');
        $scope.images.$remove(image);
      
    console.log('Leaves the function');
  };
    
   
    
})


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.browse', {
      url: '/browse',
      views: {
        'menuContent': {
          templateUrl: 'templates/browse.html'
        }
      }
    })
   .state('app.home', {
      url: '/home',
      views: {
        'menuContent': {
          templateUrl: 'templates/home.html'
        }
      }
    })
   .state('app.submitAd', {
      url: '/submitAd',
      views: {
        'menuContent': {
          templateUrl: 'templates/submitAd.html'
        }
      }
    })
   .state('app.help', {
      url: '/help',
      views: {
        'menuContent': {
          templateUrl: 'templates/help.html'
        }
      }
    })
    .state('app.playlists', {
      url: '/playlists',
      views: {
        'menuContent': {
          templateUrl: 'templates/playlists.html',
          controller: 'PlaylistsCtrl'
        }
      }
    })

  .state('app.single', {
    url: '/playlists/:playlistId',
    views: {
      'menuContent': {
        templateUrl: 'templates/playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
});
