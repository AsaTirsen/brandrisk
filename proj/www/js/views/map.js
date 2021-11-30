import m from "mithril";
import L from "leaflet";
import {geosearch} from "esri-leaflet-geocoder";

import {position} from "../models/position.js";
import {currentRisk} from "../models/currentrisk";

import locationIcon from "../../location.png";
//import targetIcon from "../../targetIcon.jpg";


import "leaflet/dist/leaflet.css";
import "leaflet/dist/images/marker-icon-2x.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-shadow.png";
import * as F from "@mithril-icons/font-awesome";

let map;
let marker;
let searchControl;
let results;

let locationMarker = L.icon({
    iconUrl: locationIcon,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
    popupAnchor: [0, 0]
});

// Draws position of users current location
function showPosition() {
    if (position.currentPos.latitude && position.currentPos.longitude) {
        results.clearLayers();
        if (marker) {
            marker.remove();
        }
        marker = L.marker(
            [
                position.currentPos.latitude,
                position.currentPos.longitude
            ],
            {
                icon: locationMarker
            }
        ).addTo(map).bindPopup("Din plats");
    }
}

function showMap(latitude, longitude) {
    if (map) {
        map.setView([latitude, longitude], 10);
    } else {
        map = L.map("map").setView([latitude, longitude], 10);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: `&copy;
        <a href="https://www.openstreetmap.org/copyright">
        OpenStreetMap</a> contributors`
        }).addTo(map);
        showControl();
    }
}

function showControl() {
    searchControl = geosearch().addTo(map);
    results = new L.LayerGroup().addTo(map);

    searchControl.on('results', function (data) {
        results.clearLayers();
        let i = data.results.length - 1;

        position.currentPos = null;
        for (i; i >= 0; i--) {
            let latLng = data.results[i].latlng;

            results.addLayer(L.marker(latLng));
            map.setView(latLng, 10);

            currentRisk.loadedUrl = null;
            currentRisk.loadRisk(latLng.lat, latLng.lng);
        }
    });
}


function chooseDescriptionWood(risk) {
    let msg;

    switch (risk) {
        case -1:
            msg = "Ingen data/ej säsong";
            break;
        case 1:
            msg = "Mycket liten risk" + "(" + risk + ")";
            break;
        case 2:
            msg = "Liten risk" + "(" + risk + ")";
            break;
        case 3:
            msg = "Måttlig risk" + "(" + risk+ ")";
            break;
        case 4:
            msg = "Stor risk" + "(" + risk + ")";
            break;
        case 5:
            msg = "Mycket stor risk" + "(" + risk + ")";
            break;
        case 6:
            msg = "Extremt stor risk" + "(" + risk + ")";
            break;
    }
    return msg;
}

function chooseDescriptionGrass(risk) {
    let msg;

    switch (risk) {
        case 0:
            msg = "Ingen data/ej säsong";
            break;
        case 1:
            msg = "Liten risk (snötäckt mark)" + "(" + risk + ")";
            break;
        case 2:
            msg = "Liten risk ((gräsbrandssäsongen slut)" + "(" + risk + ")";
            break;
        case 3:
            msg = "Måttlig risk" + "(" + risk + ")";
            break;
        case 4:
            msg = "Stor risk" + "(" + risk + ")";
            break;
    }
    return msg;
}

function iconColour(risk) {
    let colour;

    switch (risk) {
        case 0:
            colour = "#DDDDDD";
            break;
        case 1:
            colour = "#32CD32";
            break;
        case 2:
            colour = "#32CD32";
            break;
        case 3:
            colour = "#FFFF00";
            break;
        case 4 :
            colour = "#FF0000";
            break;
        case 5:
            colour = "#FF0000";
            break;
        case 6:
            colour = "#FF0000";
            break;
    }
    console.log(risk);
    console.log(colour);
    return colour;
}

function chooseDateDescription(dateComparison) {
    let date = new Date();
    let currentDate = todaysDate(date);
    let tomorrow = new Date(date.setDate(date.getDate() + 1)).getDate().toString();

    if (dateComparison === currentDate) {
        return "Idag ";
    } else if (dateComparison.slice(-2) === tomorrow) {
        return "Imorgon ";
    } else {
        return "";
    }
}

function todaysDate(today) {
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = yyyy + '-' + mm + '-' + dd;
    return today;
}


const mapView = {
    oninit: position.loadPosition,
    oncreate: function () {
        if (position.currentPos.latitude && position.currentPos.longitude) {
            showMap(position.currentPos.latitude, position.currentPos.longitude);
        }
        console.log("oncreate");
    },
    onremove: function () {
        position.currentPos = "";
        map = null;
    },
    view: function () {
        if (!map) {
            mapView.oncreate();
        }
        if (position.currentPos && map) {
            showPosition();
            currentRisk.loadRisk(position.currentPos.latitude, position.currentPos.longitude);
            showMap(position.currentPos.latitude, position.currentPos.longitude);
        }
        return [
            m("div#map.map", "",
                m("div.locationButton", {
                    onclick: function () {
                        position.currentPos = null;
                        currentRisk.loadedUrl = null;
                        position.loadPosition();
                    }
                },
                m(F.solid.Crosshairs, {class: 'target', fill: 'white', width: 20, height: 20}),
                ),
            ),
            m("div", currentRisk.risk.map(function (forecastItem) {
                return m("div.details",
                    m("div.date", chooseDateDescription(forecastItem.Date), forecastItem.Date),
                    m("div.prediction", "Prognos utfärdad: ", todaysDate(new Date()), " 00:00"),
                    m('hr.line'),
                    m(F.solid.Fire, {class: 'fireicon', fill: iconColour(forecastItem.Wood),
                        width: 30, height: 30}),
                    m("div.fire", "Skogsbrand "),
                    m("div.risk", chooseDescriptionWood(forecastItem.Wood)),
                    m("div.desc", forecastItem.WoodMsg),
                    m('hr.line'),
                    m(F.solid.Fire, {class: 'fireicon', fill: iconColour(forecastItem.Grass),
                        width: 30, height: 30}),
                    m("div.fire", "Gräsbrand "),
                    m("div.risk", chooseDescriptionGrass(forecastItem.Grass)),
                    m("div.desc", forecastItem.GrassMsg),
                );
            }
            )
            ),
        ];
    }
};

export default mapView;
