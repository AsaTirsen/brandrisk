import m from "mithril";
import {baseUrl} from "../urls.js";

const ping = {
    url: baseUrl + "Ping/",
    getPing: function () {
        m.request({
            url: ping.url,
            method: "GET",
        }).then(function (result) {
            console.log(result);
        });
    },
};

export { ping };

