"use strict";

import m from "mithril";

const position = {
    currentPos: {},

    loadPosition: function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position.geoSuccess,
                position.geoError
            );
        }
    },

    geoSuccess: function(pos) {
        position.currentPos = pos.coords;
        m.redraw();
    },

    geoError: function(error) {
        console.log('code: '    + error.code    + '\n' +
            'message: ' + error.message + '\n');
    }
};

export { position };
