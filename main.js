const leafletMap = (() => {
    const lat = 52.0273;
    const long = 19.0527;

    var defaultIcon = L.icon({
        iconUrl: 'images/icon_move.png',

        iconSize:     [40, 40], // size of the icon
        iconAnchor:   [20, 20], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var locoET22Icon = L.icon({
        iconUrl: 'images/et22-676.bmp',

        iconSize:     [88.8, 24], // size of the icon
        iconAnchor:   [44.4, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var locoET42Icon = L.icon({
        iconUrl: 'images/et42-029.jpg',

        iconSize:     [141.6, 24], // size of the icon
        iconAnchor:   [70.8, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var locoET41Icon = L.icon({
        iconUrl: 'images/et41-100.jpg',

        iconSize:     [148.8, 24], // size of the icon
        iconAnchor:   [74.4, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var locoEU07Icon = L.icon({
        iconUrl: 'images/eu07-128.bmp',

        iconSize:     [72, 24], // size of the icon
        iconAnchor:   [36, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var locoST44Icon = L.icon({
        iconUrl: 'images/st44-313.bmp',

        iconSize:     [81.6, 24], // size of the icon
        iconAnchor:   [40.8, 12], // point of the icon which will correspond to marker's location
        shadowAnchor: [0, 0],  // the same for the shadow
        popupAnchor:  [0, 0] // point from which the popup should open relative to the iconAnchor
    });

    var locationMap = L.map('locationMap').setView([lat, long], 7);

    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

    const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, {attribution});
    tiles.addTo(locationMap);

    function fetchData() {
        fetch('locations.php')
        .then(response => response.json())
        .then(data => {
                data.Locomotives.forEach(item => {
                    let lat = item.Localization.Latitude;
                    let long = item.Localization.Longitude;
    
                    let rotation = item.Direction-90;
                    
                    switch(item.LocomotiveSeries){
                        case "ET22":
                            marker = L.marker([lat,long], {icon: locoET22Icon /*, rotationAngle: rotation*/}).addTo(locationMap);
                            break;
                        case "ET42":
                            marker = L.marker([lat,long], {icon: locoET42Icon /*, rotationAngle: rotation*/}).addTo(locationMap);
                            break;
                        case "ET41":
                            marker = L.marker([lat,long], {icon: locoET41Icon /*, rotationAngle: rotation*/}).addTo(locationMap);
                            break;
                        case "EU07":
                            marker = L.marker([lat,long], {icon: locoEU07Icon /*, rotationAngle: rotation*/}).addTo(locationMap);
                            break;
                        case "ST44m":
                            marker = L.marker([lat,long], {icon: locoST44Icon /*, rotationAngle: rotation*/}).addTo(locationMap);
                            break;
                        default:
                            marker = L.marker([lat,long], {icon: defaultIcon, rotationAngle: rotation}).addTo(locationMap);
                            break;
                    }
                    
                    marker.bindPopup(`${item.LocomotiveSeries}-${item.LocomotiveNumber}`);
                })
        });
    };

    fetchData();

    const updateData = setInterval(()=>{
        locationMap.eachLayer((layer) => {
            if(layer['_latlng']!=undefined)
                layer.remove();
        });
        fetchData();
    },30000);

})();