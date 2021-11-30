"use strict";
import m from 'mithril';
import * as F from "@mithril-icons/font-awesome";



const information = {
    text: `I startläget finns prognos för aktuell dag och fem dagar framåt.
        Prognosen presenteras med en symbol i tre olika färger och aktuell risknivå samt 
        information om hur du bör agera när du eldar utomhus i trädgården eller ute i naturen. 
        Tänk på att alltid
    kontrollera om eldningsförbud råder där du befinner dig innan du gör upp eld eller
    vid andra aktiviteter som kan orsaka gnistbildning. Information om eldningsförbud kan du
    hitta på din kommuns webbplats. I vissa fall kan även Länsstyrelsen i ditt län utfärda
    eldningsförbud. Länsstyrelserna har en karttjänst för var eldningsförbud råder i Sverige.
    Kartan presenteras på krisinformation.se.`,
    view: function () {
        return [
            m("div.info",
                m("div.risk", "Så här fungerar appen"),
                m("div.risk", "Applikationens startläge"),
                m("div.desc", information.text, [
                    m("h4", "Skala för gräsbrand (appens startläge)"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#FF0000", width: 15, height: 15}),
                    m("p.desc", "Stor risk"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#FFFF00", width: 15, height: 15}),
                    m("p.desc", "Måttlig risk"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#32CD32", width: 15, height: 15}),
                    m("p.desc", "Liten risk"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#DDDDDD", width: 15, height: 15}),
                    m("p.desc", "Data saknas/Ej säsong"),
                    m("h4", "Skala för skogsbrand (appens startläge)"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#FF0000", width: 15, height: 15}),
                    m("p.desc", "Extremt stor risk (5E), mycket stor risk (5), Stor risk  (4)"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#FFFF00", width: 15, height: 15}),
                    m("p.desc", "Måttlig risk (3)"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#32CD32", width: 15, height: 15}),
                    m("p.desc", "Liten risk (2), mycket liten risk (1)"),
                    m(F.solid.Fire, {class: 'fireicn', fill: "#DDDDDD", width: 15, height: 15}),
                    m("p.desc", "Data saknas/Ej säsong"),
                ]),
            ),
        ];
    },

};

export {information};
