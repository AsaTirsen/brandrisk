"use strict";

import m from 'mithril';
import * as F from '@mithril-icons/font-awesome';
import image from "../../img/forestFire.png";

let navOpen = false;


const layout = {
    heading: "BRANDRISK Ute",
    view: function (vnode) {
        console.log("view() navOpen = " + navOpen);
        return m("main.root", [
            m("nav.top-nav", {style: {marginLeft: navOpen ? "70%" : "0px"}}, [
                m("a.burger", {
                    onclick: function (e) {
                        console.log("onclick() navOpen = " + navOpen);
                        navOpen = !navOpen;
                        if (navOpen) {
                            layout.heading = null;
                        }
                        m.redraw();
                        e.preventDefault();
                    }
                }, m(F.solid.Bars, {fill: 'white', width: 30, height: 30})),
                m("div.#mySidenav.sidenav", {style: {width: navOpen ? "70%" : "0px"}}, [
                    m("img", {src: image, style: {width: '100%', height: '30%'}}),
                    m("ul", {id: "links"}, [
                        m("li", [
                            m("a.fire", {
                                href: "#!/", oncreate: m.route.Link, onclick: function () {
                                    layout.heading = "BRANDRISK Ute";
                                    navOpen = !navOpen;
                                    m.redraw();
                                },
                            }, "Brandriskprognoser"),
                        ]),
                        m("li", [
                            m("a.fire", {
                                href: "#!/info", oncreate: m.route.Link, onclick: function () {
                                    layout.heading = "Risknivåer och Information";
                                    navOpen = !navOpen;
                                    m.redraw();
                                },
                            }, "Risknivåer och Information"),
                        ]),
                    ]),
                ]),
                m("div", {id: "heading"}, layout.heading),
                m("div.star", m(F.solid.Star, {fill: 'white', width: 30, height: 30})),
            ]),
            m("main#container.container",
                {style: {marginLeft: navOpen ? "70%" : "0px"}}, "", [ vnode.children ]),
        ]);
    },
};

export {layout};
