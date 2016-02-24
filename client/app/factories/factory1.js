myApp
// .factory('Http', function($http) {
//    function post(url, userLoc) {
//      return $http.post(url, userLoc)
//    }
//    return {
//      post : post
//    }
//})
.factory('Data', function($http) {
   var getPromise;
   var promise = function(userLoc){
    console.log('Line 13 : Promise function called');
      getPromise = $http.post('/api', userLoc);
   }

   var fetchData = function (){
      return getPromise;
   }

   var getData = function (userLoc) {
      console.log('L22 : Get Data run');
      promise(userLoc);
      return fetchData()
      .then(function(data) {
         return data.data.map(function(restaurant) {
            return {
               restaurant: restaurant
            }
         })
      })
   };

   var clickedItem = {};

   return {
      getData : getData,
      clickedItem : clickedItem
   }
}).factory('distance', function() {
   var calc = function (userLoc, destinLoc) {
      //Expects objects with properties 'lat & long'
      var lat1 = userLoc.lat, long1 = userLoc.long, lat2 = destinLoc.lat, long2 = destinLoc.long;
      // console.log('Lat1: ' + lat1 + '\nLong1: ' + long1 + '\nLat2: ' + lat2 + '\nLong2: ' + long2);
      var deg2rad = function (deg) {
        return deg * (Math.PI/180)
      }
      var R = 6371; // Radius of Earth
      var dLat = deg2rad(lat2-lat1);
      var dLon = deg2rad(lon2-lon1);
      var a =
         Math.sin(dLat/2) * Math.sin(dLat/2) +
         Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
         Math.sin(dLon/2) * Math.sin(dLon/2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
      var d = (R * c) * 0.621371;
      return Math.round(d * 10) / 10
   }
   
   return {
      calc : calc
   }
})




//Rick factories below here ^O^/
.factory('PostData', function($http) {

  function updateWait(objToSend) {

    // PUT
    // /api/update (wait, place_id)

    $http({
      method: 'PUT',
      url: '/api/update',
      data: objToSend
    }).then(function successCallback(response) {
      console.log('PUT: Sent ' + JSON.stringify(objToSend) + ' successfully');
      console.log('Response from server is : ', response);
    }, function errorCallback(response) {
      console.log('ERROR on Put Request!');
    });

  }

  return {
    updateWait: updateWait
  };
});
