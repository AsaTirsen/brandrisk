import m from "mithril";
import {baseUrl} from "../urls";

function formatDate(dateString) {
    const months = ["Januari", "Februari", "Mars", "April", "Maj",
        "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"];

    return  dateString.slice(-2) + " " + months[(parseInt(dateString.slice(5, 7))-1)];
}

const currentRisk = {
    risk: [],
    loadedUrl: null,
    loadRisk: function (lat, long) {
        let latitude = lat.toFixed(2);
        let longitude = long.toFixed(2);
        let url = baseUrl + "RiskForecast/sv/" + latitude + "|" + longitude;

        if (currentRisk.loadedUrl && currentRisk.loadedUrl === url) {
            // We already loaded (or are loading) this url
            return;
        }
        currentRisk.loadedUrl = url;

        m.request({
            url: url,
            method: "GET",
        }).then(function (result) {
            currentRisk.risk = result;
            console.log(currentRisk.risk);
            currentRisk.date = formatDate(Object.values(currentRisk.risk)[0]);
            m.redraw();
        });
    },
};

export {currentRisk};

