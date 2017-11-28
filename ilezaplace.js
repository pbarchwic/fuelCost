var ave;
var price;
var parseDistance;
var resultFuel;
var myFuel;
var source;
var destination;
var distance;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

google.maps.event.addDomListener(window, 'load', function () {
    new google.maps.places.Autocomplete(document.getElementById('Source', 'Destination'));
    new google.maps.places.SearchBox(document.getElementById('Source'));
    new google.maps.places.SearchBox(document.getElementById('Destination'));
    directionsDisplay = new google.maps.DirectionsRenderer({ 'draggable': true });
});
(function () {
    myFuel = document.getElementsByName("fuel");
    for(var i = 0; i < myFuel.length; i++){
        myFuel[i].onclick = function(){
            price = this.value
            document.getElementById('fuelCost').innerText = price + " zł";
    };
};
})();

function allMap() {
    var warsaw = {lat: 52.23, lng: 21.01};
    var map = new google.maps.Map(document.getElementById('map'), {
      center: warsaw,
      zoom: 5
    });
    var directionsDisplay = new google.maps.DirectionsRenderer({
      map: map});
      source = document.getElementById("Source").value;
      destination = document.getElementById("Destination").value;
  
      var request = {
          origin: source,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function (response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
          }
    });
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix({
        origins: [source],
        destinations: [destination],
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
    }, function (response, status) {
        if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
            distance = response.rows[0].elements[0].distance.text;
            var duration = response.rows[0].elements[0].duration.text;
            var distanceResult = document.getElementById("Distance");
            var durationResult = document.getElementById("Duration");
            distanceResult.innerHTML = distance;
            durationResult.innerHTML = duration;
 
        } else {
            alert("Bez samolotu nie da rady!");
        }

    });

}
allMap();




function result()
{
    setTimeout(function()
{
    ave = document.getElementById('average').value.replace(/,/g, '.');
    parseDistance = distance.substr(0, distance.length - 3).replace(/\s+/g, '').replace(/,/g, '.');
    resultFuel = [(price*ave)/100]*parseDistance;
    var finallyResult = document.getElementById("fuelPrice");
    finallyResult.innerHTML =resultFuel.toFixed(2) + " zł";
    
}, 1000)};