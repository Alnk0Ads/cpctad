( () => {
    const e = JSON.parse(document.currentScript.dataset.config);
    let t = !1
      , n = document.currentScript.dataset.uuid
      , o = ".xh8yej3 > ._7jvw.x2izyaf.x1hq5gj4.x1d52u69"
      , s = [["child", "memoizedProps", "children", "props", "adCards", "_tail", "array"], ["child", "pendingProps", "children", "props", "adCards", "_tail", "array"]]
      , r = ["adArchiveID", "pageID"];
    const i = (t, o, s) => {
        try {
            s && (o.uuid = n),
            t.contentWindow.postMessage(o, e.POPUP_URL),
            e[e.MODE].DEBUG
        } catch (t) {
            e[e.MODE].DEBUG
        }
    }
    ;
    window.addEventListener("message", (n => {
        e.POPUP_URL.includes(n.origin) && n.data.type && (e[e.MODE].DEBUG,
        "READY_SIGNAL" === n.data.type ? (n => {
            const {success: o} = n;
            t = !!o,
            e[e.MODE].DEBUG
        }
        )(n.data) : "SET_CONFIG" === n.data.type && (t => {
            const {config: n} = t;
            n && (e[e.MODE].DEBUG,
            n.initialAdsChildQuerySelector && (o = n.initialAdsChildQuerySelector),
            n.adDataReactFiberPropertyPaths?.length && (s = n.adDataReactFiberPropertyPaths),
            n.adDataValidationKeys?.length && (r = n.adDataValidationKeys),
            e[e.MODE].DEBUG)
        }
        )(n.data))
    }
    ));
    const a = () => new Promise((e => {
        const n = () => {
            const o = document.querySelector("#popup-iframe");
            o && t ? e(o) : (o && i(o, {
                type: "READY_SIGNAL"
            }, !0),
            setTimeout(n, 100))
        }
        ;
        n()
    }
    ))
      , c = async t => {
        let n = await a();
        e[e.MODE].DEBUG,
        i(n, t, !0)
    }
    ;
    let l = window.XMLHttpRequest.prototype.open;
    Object.defineProperty(window.XMLHttpRequest.prototype, "open", {
        writable: !0
    }),
    window.XMLHttpRequest.prototype.open = function() {
        let t = arguments[1];
        if (t.includes("/search_ads/"))
            try {
                return t = (e => {
                    const t = e.split("?")[0]
                      , n = e.split("?")[1]
                      , o = new URLSearchParams(n)
                      , s = new URLSearchParams;
                    for (const [e,t] of o.entries())
                        e.toLowerCase().includes("excluded_ids") || s.append(e, t);
                    return t + "?" + s.toString()
                }
                )(t),
                arguments[1] = t,
                l.apply(this, [].slice.call(arguments))
            } catch (t) {
                e[e.MODE].DEBUG
            }
        return l.apply(this, [].slice.call(arguments))
    }
    ,
    Object.defineProperty(window.XMLHttpRequest.prototype, "open", {
        writable: !1
    });
    let p = window.XMLHttpRequest.prototype.send;
    Object.defineProperty(window.XMLHttpRequest.prototype, "send", {
        writable: !0
    }),
    window.XMLHttpRequest.prototype.send = function() {
        let e = !1
          , t = !1
          , n = !1
          , o = null;
        if (arguments?.length && "string" == typeof arguments[0]) {
            o = new URLSearchParams(arguments[0]);
            const s = JSON.parse(o.get("variables"));
            if (s) {
                const {pageID: t} = s;
                e = !!t
            }
            const r = o.get("doc_id")?.toString();
            r && (t = ["6622080967917089", "8397186743646977", "26067353969575535", "26655791350701201", "8010675412346585"].includes(r),
            n = ["7822800761110468", "7119363784833351"].includes(r))
        }
        return this.addEventListener("load", (function() {
            if (this.responseURL.includes("/search_ads/")) {
                let e = {
                    type: "ADD_ADS_DATA",
                    content: btoa(this.responseText),
                    url: btoa(this.responseURL)
                };
                c(e)
            } else if (this.responseURL.includes("/collation/")) {
                let e = {
                    type: "ADD_COLLATION_GROUP_DATA",
                    content: btoa(this.responseText),
                    url: btoa(this.responseURL)
                };
                c(e)
            } else if (this.responseURL.includes("/graphql/") && (t || this.responseText.includes("search_results_connection"))) {
                let e = {
                    type: "ADD_NEW_ADS_DATA",
                    content: btoa(encodeURIComponent(this.responseText)),
                    url: btoa(this.responseURL)
                };
                c(e)
            } else if (this.responseURL.includes("/graphql/") && (n || (e => e.includes("collation_results"))(this.responseText))) {
                let e = {
                    type: "ADD_NEW_COLLATION_GROUP_DATA",
                    content: btoa(this.responseText),
                    url: btoa(this.responseURL)
                };
                c(e)
            } else if (this.responseURL.includes("/graphql/") && e) {
                let e = {
                    type: "ADD_ADVERTISER_DATA",
                    content: btoa(this.responseText),
                    body: btoa(o?.toString() || null),
                    url: btoa(this.responseURL)
                };
                c(e)
            }
        }
        )),
        p.apply(this, [].slice.call(arguments))
    }
    ,
    Object.defineProperty(window.XMLHttpRequest.prototype, "send", {
        writable: !1
    });
    const d = (e, t, n=!0, o=!0) => {
        let s = [];
        try {
            JSON.stringify(e, ( (e, r) => {
                if (r && r.hasOwnProperty(t)) {
                    let e = n ? r[t] : r;
                    if (o)
                        throw s = e,
                        new Error;
                    s.push(e)
                }
                return r
            }
            ))
        } catch (e) {}
        return s
    }
      , u = t => {
        const {require: n, markup: o} = t;
        if (o && n) {
            const t = d(o, "__html", !1, !1);
            if (e[e.MODE].DEBUG,
            t.length) {
                const o = t[0]
                  , s = d(n, "deeplinkAdCard");
                if (e[e.MODE].DEBUG,
                s) {
                    const {snapshot: e} = s;
                    if (e) {
                        const t = e.body;
                        e.body = {
                            markup: o
                        },
                        s.singleAd = !0;
                        const n = JSON.stringify([s]);
                        let r = {
                            type: "ADD_SINGLE_AD_DATA",
                            content: btoa(encodeURIComponent(n))
                        };
                        c(r),
                        e.body = t
                    }
                }
            }
        }
    }
      , h = e => Array.from(document.querySelectorAll("script")).filter((t => t.textContent.includes(e))).map((e => e.textContent));
    ( (t, n, o) => {
        try {
            const s = h(t);
            e[e.MODE].DEBUG,
            s.forEach((e => {
                const s = e.split(t)[1]
                  , r = s.indexOf(n) + 1
                  , i = s.indexOf(o) + 1
                  , a = s.substring(r, i)
                  , c = JSON.parse(a);
                u(c)
            }
            ))
        } catch (t) {
            e[e.MODE].DEBUG
        }
    }
    )(".handle", "({", "})");
    (t => new Promise((n => {
        const o = () => {
            if (window.location.search.includes("&id=") || window.location.search.includes("?id=")) {
                const s = h(t);
                e[e.MODE].DEBUG,
                s.length ? n(s) : setTimeout(o, 5)
            } else
                n([])
        }
        ;
        o()
    }
    )))("deeplinkAdCard").then((t => {
        try {
            t.forEach((t => {
                (t => {
                    const n = d(t, "otherProps")
                      , o = d(t, "markup");
                    if (o && n) {
                        const t = d(o, "__html", !1, !1);
                        if (e[e.MODE].DEBUG,
                        t.length) {
                            const o = t[0]
                              , s = d(n, "deeplinkAdCard");
                            if (e[e.MODE].DEBUG,
                            s) {
                                const {snapshot: e} = s;
                                if (e) {
                                    const t = e.body;
                                    e.body = {
                                        markup: o
                                    },
                                    s.singleAd = !0;
                                    const n = JSON.stringify([s]);
                                    let r = {
                                        type: "ADD_SINGLE_AD_DATA",
                                        content: btoa(encodeURIComponent(n))
                                    };
                                    c(r),
                                    e.body = t
                                }
                            }
                        }
                    }
                }
                )(JSON.parse(t))
            }
            ))
        } catch (t) {
            e[e.MODE].DEBUG
        }
    }
    ));
    const D = (e, t) => {
        const n = t.shift();
        return n ? e[n] ? D(e[n], t) : [] : e
    }
      , y = e => {
        let t = null;
        return s.forEach((n => {
            const o = D(e, [...n]);
            (e => {
                if (!e)
                    return !1;
                const t = e[0];
                if (!t || "object" != typeof t)
                    return !1;
                let n = !1;
                return r?.forEach((e => {
                    t[e] && (n = !0)
                }
                )),
                n
            }
            )(o) && (t = o)
        }
        )),
        t
    }
      , E = t => {
        const n = (t => {
            const n = [];
            t.forEach((e => {
                const t = e[Object.keys(e).find((e => e.includes("reactFiber")))]
                  , o = y(t);
                o && n.push(o)
            }
            ));
            const o = t.length === n.length;
            if (e[e.MODE].DEBUG,
            !o)
                throw new Error("Incomplete adsData");
            return n
        }
        )(t)
          , o = {
            result: {
                data: {
                    ad_library_main: {
                        search_results_connection: {
                            edges: n.map((e => ({
                                node: {
                                    collated_results: e
                                }
                            }))),
                            page_info: {
                                has_next_page: !0
                            },
                            count: t.length
                        }
                    }
                }
            }
        };
        return JSON.stringify(o)
    }
      , f = t => new Promise((n => {
        const s = () => {
            const r = h(t)
              , i = o ? Array.from(document.querySelectorAll(o)).map((e => e.parentElement)) : [];
            e[e.MODE].DEBUG;
            try {
                if (r.length)
                    r.forEach((e => {
                        JSON.parse(e)
                    }
                    )),
                    n(r);
                else if (i.length) {
                    const e = E(i);
                    n([e])
                } else
                    setTimeout(s, 250)
            } catch (t) {
                e[e.MODE].DEBUG,
                setTimeout(s, 250)
            }
        }
        ;
        s()
    }
    ));
    (t => {
        f(t).then((t => {
            try {
                t.forEach((t => {
                    (t => {
                        const n = d(t, "result");
                        if (n && (e[e.MODE].DEBUG,
                        d(t, "search_results_connection"))) {
                            e[e.MODE].DEBUG;
                            let t = {
                                type: "ADD_NEW_ADS_DATA",
                                content: btoa(encodeURIComponent(JSON.stringify(n))),
                                url: btoa(window.location.href)
                            };
                            c(t)
                        }
                    }
                    )(JSON.parse(t))
                }
                ))
            } catch (t) {
                e[e.MODE].DEBUG
            }
        }
        ))
    }
    )("search_results_connection");
    new Promise((t => {
        const n = () => {
            const {requireLazy: o} = window;
            e[e.MODE].DEBUG,
            o ? t(o) : setTimeout(n, 1)
        }
        ;
        n()
    }
    )).then((t => {
        t(["ServerJS"], (function(t) {
            let n = t.prototype.handle;
            t.prototype.handle = function() {
                try {
                    arguments?.length && arguments[0] && u(arguments[0])
                } catch (t) {
                    e[e.MODE].DEBUG
                }
                return n.apply(this, [].slice.call(arguments))
            }
            ,
            e[e.MODE].DEBUG
        }
        ))
    }
    ))
}
)();
