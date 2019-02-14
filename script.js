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
