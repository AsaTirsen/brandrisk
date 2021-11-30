//import m from "mithril";
import {ping} from "../models/ping";


const isAlive = {
    oninit: ping.getPing(),
    oncreate: function () {
        console.log("ping");
    }
};

export { isAlive };
