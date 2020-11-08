var data = [];
var markerData = {};
$.getJSON("assets/coords.json", function (json) {
    data = json["coordinates"]; // this will show the info it in firebug console
    for (var i = 0; i < data.length; i++) {
        var curData = data[i];
        if (!(curData["type"] in markerData)) {
            markerData[curData["type"]] = [];
        }

        markerData[curData["type"].toUpperCase()].push(L.circleMarker([curData["y"], curData["x"]]));
    }
});

var map = L.map('map', {
    // minZoom: 1.35,
    maxZoom: 3,
    crs: L.CRS.Simple,
    renderer: L.canvas()
});
map.zoomControl.setPosition("bottomright");

// latLng (ie [y, x])
// "center" of map is center of wolf circle. North has 2113 px; 2113/6144*1000=344
// numbers should increase up/right aka north/east. Therefore y bounds are [[344, _], [-656, _]]
var bounds = [[0, 0], [1000, 1000]];
var image = L.imageOverlay('assets/Teyvat.webp', bounds).addTo(map);

map.fitBounds(bounds);


function display(type) {
    var subset = markerData[type.toUpperCase()];
    for (var i = 0; i < subset.length; i++) {
        subset[i].addTo(map);
    }
}

function hide(type) {
    var subset = markerData[type.toUpperCase()];
    for (var i = 0; i < subset.length; i++) {
        subset[i].remove();
    }
}