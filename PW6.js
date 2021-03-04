var map;
var service;

function callback(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      // createMarker(results[i]);

      new google.maps.Marker({
        map,
        title: results[i].name,
        position: results[i].geometry.location,
      });


    }
  }
}
      // new google.maps.Marker({
      //   map: map,
      //   position: results[0].geometry.location,
      // });

function geolocate(geocoder, resultsMap) {
  var address = document.getElementById("address").value;
  geocoder.geocode({ 'address' : address }, function(results, status) {
   try {
    if (status === "OK") {
        resultsMap.setCenter({lat: results[0].geometry.location.lat(),lng : results[0].geometry.location.lng()});
        var request = {
            location: {lat: results[0].geometry.location.lat(),lng : results[0].geometry.location.lng()},
            radius: '1500',
            type: ['pharmacy']
        };

      service = new google.maps.places.PlacesService(resultsMap);
      service.nearbySearch(request, callback);
      return results[0].geometry.location;
    } else {
      alert("Geocode was not successful for the following reason: " + status);
    }
       
   } catch (error) {
       console.log('Error : '+error);
   }   
   
  });
}

function initialize() {

  var geocoder = new google.maps.Geocoder();   

  var utd = new google.maps.LatLng(32.985771, -96.750003 );

  map = new google.maps.Map(document.getElementById('map'), {
      center: utd,
      zoom: 18
    });
  
  document.getElementById("search").addEventListener("click", () => {
    geolocate(geocoder, map);
  });

}