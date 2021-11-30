# proj
Proj is an attempt att making a copy of the app Brandrisk Ute for the purpose 
of practising building webapps. 

This app can be used to get a current report and a five day forecast of the risk of forest fires and grassfires in Sweden, either by using
the location of the user's device or by searching for a specific location on the map. The map is used for representing the location being searched. 

The forecast for risk of forest fires and grass fires respectively, is presented in text below the map.
The forecast consists of the date, coloured symbols, a numeric grading of the firerisk and a description.

On the second page of the app there is information about the app, its forecasts and keys for the 
symbols.

#Data sources 
Proj uses data from two sources; firstly, the API [api.msb.se/brandrisk/RiskService.svc](https://www.msb.se/sv/amnesomraden/skydd-mot-olyckor-och-farliga-amnen/naturolyckor-och-klimat/skogsbrand-och-vegetationsbrand/appen-brandrisk-ute/) via a proxy server 
[yacdn.org](https://ovsoinc.github.io/yacdn.org/) as the brandrisk API does not allow CORS.
Secondly,  [geocode.arcgis.com](https://developers.arcgis.com/features/geocoding/) which provides location alternatives for the user's location search. 

#Technical specification 
Proj is built using the [Mithril framework](https://mithril.js.org/) and [Apache Cordova](https://cordova.apache.org/docs/en/latest/#plugin-apis).

The instructions for using the brandrisk API can be found in this [technical specification for the brandrisk API](https://www.msb.se/contentassets/8f8009a0102849fa9615e60fee89fa61/tekniskt-underlag-till-apiet-brandrisk-ute2.pdf).
The map source code found in views/map is produced with [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/). 
It uses the leaflet plugin [esri geosearch](https://esri.github.io/esri-leaflet/api-reference/controls/geosearch.html) to provide 
a search control with a shortlist of location hits and zoom. 

The location on the map is initially set to the user device location in models/position. If the user chooses a location from 
the search control, the map is redrawn for this new location by calling the function showMap() with the new coordinates.
Similarly, the function currentRisk.loadRisk() is called with the updated coordinates to get correct forecast for the 
requested location.

In the models catalog there are the modules "position" and "currentrisk". Those are used to get position from the cordova plug-in Navigator.geolocation and the risk forecast from 
the Brandrisk API respectively. 
Most of the app's functions are kept in the file views/map where the map is drawn and various helper functions are used to 
change the forecast messages depending on the numeric risk grading. 
In views/layout the navigation and page layout is set.
Views/info contain text to instruct the user of the app. 


 
