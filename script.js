document.getElementById("locationGo").addEventListener("click", function(event) {

  document.getElementById("map").innerHTML = "";
  document.getElementById("ip_data").innerHTML = "";

  var platform = new H.service.Platform({
    'app_id': 'Jt5CZlZD8mAR7NZ8ESmu',
    'app_code': 'vKJ85BIt8ni-L4zrxMOsWA'
  });

  fetch("https://ipinfo.io/json?token=1d48b5d9306d6d")
    .then(function(response) {
      return response.json()
    }).then(function(json) {
      latlong = json.loc.split(",");
      var defaultLayers = platform.createDefaultLayers();

      // Instantiate (and display) a map object:
      var map = new H.Map(
        document.getElementById('map'),
        defaultLayers.normal.map, {
          zoom: 10,
          center: {
            lat: latlong[0],
            lng: latlong[1]
          }
        });

      var icon = new H.map.Icon('placeholder.svg');

      // Create a marker using the previously instantiated icon:
      var marker = new H.map.Marker({
        lat: latlong[0],
        lng: latlong[1]
      }, {
        icon: icon
      });

      // Add the marker to the map:
      map.setCenter({
        lat: latlong[0],
        lng: latlong[1]
      });
      map.addObject(marker);

      var data = "<h2>Geo data based on your IP address</h2>";
      data += "<p>IP Address: " + json.ip + "<\p>";

      console.log(json.hostname);
      if (json.hostname != undefined) {
        data += "<p>Hostname: " + json.hostname + "<\p>";
      }

      data += "<p>Organization: " + json.org + "<\p>";
      data += "<p>City: " + json.city + "<\p>";
      data += "<p>Region: " + json.region + "<\p>";
      data += "<p>Country: " + json.country + "<\p>";

      document.getElementById("ip_data").innerHTML = data;
    });
});

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}