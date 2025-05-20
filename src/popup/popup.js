import {getActiveTabURL as e, engagementHandlerDefault as t, fetchWebsiteServerStatus as a, fetchApiServerStatus as s, openSupportUrl as o, createSpinner as r, removeSpinnerFromElement as i} from "../utils/utils.js";
import {CopycatAdsConfig as n} from "../../config/config.js";
$((function() {
    let e = {
        "#info-usage-alert": {
            boundary: "window",
            placement: "top",
            title: "Créditos restantes para pesquisar, filtrar, salvar e copiar. Usuários cadastrados recebem créditos adicionais que são renovados periodicamente. Usuários assinantes têm acesso ilimitado."
        },
        "#info-active-ads": {
            boundary: "window",
            placement: "top",
            title: "Quantidade de anúncios usada para filtrar os resultados"
        },
        "#info-filter-by": {
            boundary: "window",
            placement: "top",
            title: "Exibe apenas resultados com quantidade maior, menor ou igual à definida"
        },
        "#info-sort-by": {
            boundary: "window",
            placement: "top",
            title: "Ordena os resultados de acordo com a quantidade de anúncios"
        },
        "#info-automatic-search": {
            boundary: "window",
            placement: "top",
            title: "Pesquisar automaticamente pelos resultados mais escalados"
        },
        "#info-pause-time": {
            boundary: "window",
            placement: "top",
            title: "Tempo máximo (em minutos) de duração da pesquisa automática"
        },
        "#info-scroll-time": {
            boundary: "window",
            placement: "top",
            title: "Intervalo de tempo (em segundos) entre carregamentos de novos anúncios durante a pesquisa automática"
        },
        "#info-search-notification": {
            boundary: "window",
            placement: "top",
            title: "Notificar com som quando a pesquisa automática terminar"
        },
        "#info-filter-setup": {
            boundary: "window",
            placement: "top",
            title: "Clique na engrenagem ao lado para abrir as configurações de filtro"
        },
        "#info-search-setup": {
            boundary: "window",
            placement: "top",
            title: "Clique na engrenagem ao lado para abrir as configurações de pesquisa automática"
        },
        "#info-keyword-setup": {
            boundary: "window",
            placement: "top",
            title: "Clique no ícone ao lado para abrir a sugestão de palavras para pesquisa"
        },
        "#info-keyword-niche": {
            boundary: "window",
            placement: "top",
            title: "Qual o nicho de mercado que deseja pesquisar. Ex: renda-extra, relacionamento, emagrecimento, moda, etc."
        },
        "#info-keyword-product": {
            boundary: "window",
            placement: "top",
            title: "Qual o tipo de produto que deseja pesquisar. Ex: ebook, curso, vestuário, serviço, etc."
        },
        "#info-persistent-chat": {
            boundary: "window",
            placement: "top",
            title: "Salvar o chat de sugestão de palavras-chave no seu histórico do ChatGPT"
        },
        "#cc-btn": {
            boundary: "window",
            placement: "top",
            title: "Copycat Apps"
        },
        "#ig-btn": {
            boundary: "window",
            placement: "top",
            title: "Instagram"
        },
        "#yt-btn": {
            boundary: "window",
            placement: "top",
            title: "YouTube"
        },
        "#tt-btn": {
            boundary: "window",
            placement: "top",
            title: "TikTok"
        },
        "#wa-btn": {
            boundary: "window",
            placement: "top",
            title: "WhatsApp"
        }
    };
    for (const [t,a] of Object.entries(e))
        $(t).tooltip(a)
}
));
const c = document.querySelector("#brand-logo");
c.src = n.BRAND_LOGO_REGULAR_URL;
const d = document.querySelector("#brand-title");
d.src = n.BRAND_TITLE_REGULAR_URL;
const u = document.querySelector("#ui-toggle")
  , l = document.querySelector("#support-btn")
  , m = document.querySelector("#search-support-btn")
  , p = document.querySelector("#custom-support-btn")
  , h = document.querySelector("#signin-btn")
  , E = document.querySelector("#signup-btn")
  , y = document.querySelector("#signin-top-btn")
  , g = document.querySelector("#subscribe-top-btn")
  , v = document.querySelector("#signup-top-btn")
  , b = document.querySelector("#profile-top-btn")
  , L = document.querySelector("#signout-top-btn")
  , D = document.querySelector("#resend-btn")
  , f = document.querySelector("#update-status-btn")
  , w = document.querySelector("#subscribe-btn")
  , T = document.querySelector("#update-subscription-btn")
  , S = document.querySelector("#search-btn")
  , _ = document.querySelector("#pause-btn")
  , A = document.querySelector("#cc-btn")
  , O = document.querySelector("#ig-btn")
  , U = document.querySelector("#yt-btn")
  , M = document.querySelector("#tt-btn")
  , R = document.querySelector("#wa-btn")
  , C = document.querySelector("#active-ads")
  , k = document.querySelector("#filter-setup-btn")
  , I = document.querySelector("#filter-by")
  , q = document.querySelector("#sort-by")
  , B = document.querySelector("#automatic-search")
  , G = document.querySelector("#automatic-search-params")
  , x = document.querySelector("#search-setup-btn")
  , N = document.querySelector("#pause-time")
  , P = document.querySelector("#scroll-time")
  , F = document.querySelector("#search-notification")
  , H = document.querySelector("#keyword-setup-btn")
  , V = document.querySelector("#generate-keyword-btn")
  , Y = document.querySelector("#persistent-chat")
  , j = document.querySelector("#welcome-modal")
  , W = document.querySelector("#welcome-signin-btn")
  , z = document.querySelector("#welcome-signup-btn")
  , K = document.querySelector("#show-welcome-message")
  , X = document.querySelector("#header")
  , Q = document.querySelector("#content")
  , J = document.querySelector("#error")
  , Z = document.querySelector("#login")
  , ee = document.querySelector("#noauth-inactive")
  , te = document.querySelector("#noauth-noplan")
  , ae = document.querySelector("#app")
  , se = document.querySelector("#auth")
  , oe = document.querySelector("#signed-out")
  , re = document.querySelector("#signed-in")
  , ie = document.querySelector("#usage")
  , ne = document.querySelector("#usage-alert")
  , ce = document.querySelector("#is-searching-spinner")
  , de = document.querySelector("#pause-time-alert")
  , ue = document.querySelector("#footer")
  , le = new Audio(n.NOTIFICATION_AUDIO)
  , me = {
    restarting: !1,
    isVisible: !1,
    tab: null,
    searchTimeout: null,
    status: "login",
    defaultHeight: {
        collapsed: 82,
        app: 451,
        "app-expanded": 490,
        noauth: 367,
        login: 367,
        error: 390
    },
    isExpanded: !0,
    previousValidAuth: null,
    currentValidAuth: null,
    hasSignedOut: null,
    displaySignedOutMessage: null,
    initialAuthTokens: null,
    authData: null,
    currentAuthTokens: null,
    authTokensUpdateCount: 0,
    refreshAuthTimeout: null,
    refreshAuthLock: !1,
    authLock: 0,
    iframeReady: !1,
    iframeReloading: !1,
    iframeReloadCount: 0,
    loadingError: null,
    serverError: null,
    serverStatus: null,
    serverStatusCache: null,
    serverStatusCacheTime: null,
    isRefreshingAuthTab: !1,
    isAuthRefreshed: !1,
    injectRef: {
        source: null,
        origin: null
    },
    prompt: 'Me dê uma lista de palavras chaves presentes em anúncios do Meta Ads/Facebook Ads do nicho de "{niche}" em que a página responsável por publicar o anúncio deseja vender "{productType}". Considere que os anunciantes estão usando copywriting persuasivo focado no nicho mencionado anteriormente e extraia palavras-chaves que possam estar contidas nesses anúncios. Favor listar as palavras-chaves em 3 idiomas: português, inglês e espanhol.',
    sendAuthMessageToIframeTimeout: null,
    reloadIframeTimeout: null,
    forceRenderLoadingErrorTimeout: null
}
  , pe = e => {
    const t = {};
    for (let a = 0; a < e.options.length; a++) {
        let s = e.options[a];
        t[s.value] = s.textContent
    }
    let a = document.createElement("div");
    a.classList.add("dropdown");
    let s = document.createElement("button");
    s.classList.add("form-select"),
    s.classList.add("dropdown-align"),
    s.setAttribute("type", "button"),
    s.setAttribute("data-bs-toggle", "dropdown"),
    s.setAttribute("aria-expanded", "false"),
    s.setAttribute("value", e.value),
    s.textContent = t[e.value],
    a.appendChild(s);
    const o = (t, a) => {
        let s = document.createElement("li")
          , o = document.createElement("a");
        return o.classList.add("dropdown-item"),
        o.classList.add("dropdown-align"),
        o.removeAttribute("href"),
        o.setAttribute("value", t),
        o.textContent = a,
        o.addEventListener("click", ( () => {
            e.value = o.getAttribute("value"),
            e.dispatchEvent(new Event("change"))
        }
        )),
        s.appendChild(o),
        s
    }
    ;
    let r = document.createElement("ul");
    r.classList.add("dropdown-menu"),
    r.classList.add("dropdown-width");
    for (const [e,a] of Object.entries(t)) {
        let t = o(e, a);
        r.appendChild(t)
    }
    return a.appendChild(r),
    e.addEventListener("change", ( () => {
        s.textContent = t[e.value]
    }
    )),
    e.parentElement.appendChild(a),
    s
}
  , he = pe(I)
  , Ee = pe(q)
  , ye = () => {
    c.src = n.BRAND_LOGO_REGULAR_URL
}
  , ge = () => {
    c.src = n.BRAND_LOGO_SEARCHING_URL
}
  , ve = e => {
    me.isVisible = e
}
  , be = () => me.isVisible
  , Le = () => {
    ve(!be())
}
  , De = () => {
    me.isExpanded = "true" === document.querySelector("[aria-expanded]").getAttribute("aria-expanded")
}
  , fe = () => me.isExpanded
  , we = e => {
    const t = `Pausa automática às ${new Date(Date.now() + e).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit"
    })}`;
    de.textContent = t,
    ce.classList.remove("hide"),
    me.searchTimeout = setTimeout(( () => {
        pa(!0)
    }
    ), e)
}
  , Te = () => {
    clearTimeout(me.searchTimeout),
    de.textContent = " ",
    ce.classList.add("hide"),
    me.searchTimeout = null
}
  , Se = () => me.restarting
  , _e = e => {
    me.restarting = e
}
  , Ae = e => {
    try {
        const t = e.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")
          , a = decodeURIComponent(atob(t).split("").map((function(e) {
            return "%" + ("00" + e.charCodeAt(0).toString(16)).slice(-2)
        }
        )).join(""));
        return JSON.parse(a)
    } catch (e) {
        return n[n.MODE].DEBUG,
        {}
    }
}
  , Oe = e => {
    if (!e)
        return;
    const t = Ae(e)
      , a = Date.now();
    return 1e3 * t?.exp - a
}
  , Ue = () => {
    me.refreshAuthLock = !0,
    chrome.runtime.sendMessage({
        type: "LOCK_REFRESH_AUTH"
    })
}
  , Me = () => {
    me.refreshAuthLock = !1,
    chrome.runtime.sendMessage({
        type: "UNLOCK_REFRESH_AUTH"
    })
}
  , Re = e => {
    me.isRefreshingAuthTab = e
}
  , Ce = () => me.isRefreshingAuthTab
  , ke = async () => {
    const {isRefreshingAuthTab: e} = await chrome.runtime.sendMessage({
        type: "SYNC_REFRESH_AUTH_TABS"
    });
    return Re(e),
    e
}
  , Ie = e => {
    me.isAuthRefreshed = e
}
  , qe = () => me.isAuthRefreshed
  , Be = async () => {
    const {isAuthRefreshed: e} = await chrome.runtime.sendMessage({
        type: "SYNC_AUTH_REFRESHED"
    });
    return Ie(e),
    e
}
  , Ge = () => me.refreshAuthLock
  , $e = e => {
    me.currentAuthTokens = e
}
  , xe = () => me.currentAuthTokens
  , Ne = () => {
    me.authTokensUpdateCount += 1
}
  , Pe = () => me.authTokensUpdateCount
  , Fe = () => {
    me.authTokensUpdateCount = 0
}
  , He = e => xe()?.accessToken !== e?.accessToken
  , Ve = () => {
    me.authLock += 1
}
  , Ye = () => {
    me.authLock -= 1
}
  , je = () => me.authLock > 0
  , We = async e => {
    Ue(),
    $e(e);
    let t = await ka();
    return Me(),
    n[n.MODE].DEBUG,
    _t().includes("app") ? (Ta(),
    va(!0)) : Aa(),
    t?.isLoggedIn || chrome.runtime.sendMessage({
        type: "SIGNOUT_READY_WEB_TABS"
    }),
    t
}
  , ze = async e => {
    let t = {
        tokens: e
    };
    if (n[n.MODE].DEBUG,
    me.refreshAuthTimeout || Ge() || !e?.accessToken)
        return t;
    n[n.MODE].DEBUG;
    let a = Oe(e?.accessToken);
    return "number" != typeof a ? {} : (n[n.MODE].DEBUG,
    a <= 0 && (n[n.MODE].DEBUG,
    t = await We(e),
    n[n.MODE].DEBUG,
    !t?.tokens?.accessToken) ? {} : (me.refreshAuthTimeout = setTimeout((async () => {
        me.refreshAuthTimeout = null,
        ze(t?.tokens)
    }
    ), a + n.DEFAULT_DELAY_MS),
    n[n.MODE].DEBUG,
    t))
}
  , Ke = () => {
    clearTimeout(me.refreshAuthTimeout),
    me.refreshAuthTimeout = null
}
  , Xe = async (e, t) => {
    let a = !1;
    return new Promise(( (s, o) => {
        const r = () => {
            a = e() === t,
            a ? s(a) : setTimeout(r, n.REFRESH_RETRY_DELAY_MS)
        }
        ;
        r()
    }
    ))
}
  , Qe = () => me.iframeReady
  , Je = e => {
    me.iframeReady = e
}
  , Ze = () => me.iframeReloading
  , et = e => {
    me.iframeReloading = e
}
  , tt = () => {
    me.iframeReloadCount += 1
}
  , at = () => me.iframeReloadCount
  , st = () => {
    me.iframeReloadCount = 0
}
  , ot = () => me.loadingError
  , rt = e => {
    me.loadingError = e
}
  , it = () => me.serverStatus
  , nt = e => {
    me.serverStatus = e
}
  , ct = () => me.serverError
  , dt = e => {
    me.serverError = e
}
  , ut = async () => {
    let e;
    const t = Date.now();
    null !== me.serverStatusCache && me.serverStatusCacheTime && t - me.serverStatusCacheTime < n.SERVER_STATUS_CACHE_MS ? (e = me.serverStatusCache,
    n[n.MODE].DEBUG) : (e = await a() && await s(),
    me.serverStatusCache = e,
    me.serverStatusCacheTime = t,
    n[n.MODE].DEBUG),
    nt(e)
}
  , lt = e => {
    me.tab = me.tab || e
}
  , mt = () => me.tab
  , pt = () => !!mt()
  , ht = () => new Promise((e => {
    pt() ? e(!0) : setTimeout(pt, 100)
}
))
  , Et = (e, t) => {
    try {
        return uuid.test(t) && e === t
    } catch (e) {
        return !1
    }
}
  , yt = e => {
    me.injectUUID = me.injectUUID || e
}
  , gt = e => Et(me.injectUUID, e)
  , vt = (e, t) => {
    e && t && (me.injectRef = {
        source: e,
        origin: t
    })
}
  , bt = () => me.injectRef
  , Lt = () => {
    me.contentUUID = uuid()
}
  , Dt = e => Et(me.contentUUID, e)
  , ft = async () => {
    let t = mt() || await e();
    t && chrome.tabs.sendMessage(t.id, {
        type: "SET_UUID",
        uuid: me.contentUUID
    })
}
  , wt = () => {
    Lt(),
    ft()
}
  , Tt = async t => {
    let a = mt() || await e();
    a && chrome.tabs.sendMessage(a.id, t)
}
  , St = e => {
    me.status = e
}
  , _t = () => me.status
  , At = () => fe() ? _t() : "collapsed"
  , Ot = () => me.defaultHeight[At()]
  , Ut = e => {
    Object.keys(me.authData || {}).length > 0 && (me.previousValidAuth = me.authData),
    Object.keys(e || {}).length > 0 && (me.currentValidAuth = e),
    me.previousValidAuth?.isLoggedIn && !me.currentValidAuth?.isLoggedIn ? (me.hasSignedOut = !0,
    Rt(!0)) : me.hasSignedOut = !1,
    me.authData = e
}
  , Mt = () => !!me.hasSignedOut
  , Rt = e => {
    me.displaySignedOutMessage = e
}
  , Ct = e => me.displaySignedOutMessage
  , kt = () => me.authData
  , It = () => me.currentValidAuth
  , qt = e => {
    me.prompt = e
}
  , Bt = () => me.prompt
  , Gt = (e, t, a=0, s=Number.MAX_SAFE_INTEGER) => {
    let o = parseInt(e.value) || 0;
    return (isNaN(o) || o < a) && (o = a),
    o > s && (o = s),
    o > 1 && (t += "s"),
    e.value = `${o} ${t}`,
    o
}
  , $t = async () => {
    await chrome.storage.sync.get(null).then((e => {
        n[n.MODE].DEBUG
    }
    ))
}
  , xt = async (t, a) => {
    let s = mt() || await e();
    if (!s)
        return;
    let o = {};
    await chrome.storage.sync.get(null).then((e => {
        e[s.id] && (o = e[s.id])
    }
    )),
    o[t] = a,
    await chrome.storage.sync.set({
        [s.id]: o
    })
}
  , Nt = async () => {
    let t = mt() || await e();
    t && (n[n.MODE].DEBUG,
    chrome.tabs.sendMessage(t.id, {
        type: "RESTART"
    }),
    _e(!0))
}
  , Pt = (e, t, a=1) => {
    setTimeout((async () => {
        if (je() || Ge() || Se())
            return ua("updating"),
            await Xe(Ge, !1),
            await Xe(je, !1),
            await Xe(Se, !1),
            void Pt(e, t, a);
        const s = kt();
        t(s) ? ua(e) : la()
    }
    ), n.REFRESH_RETRY_DELAY_MS * a)
}
;
u.addEventListener("click", ( () => {
    u.classList.toggle("rotate"),
    De(),
    be() && Ea()
}
)),
k.addEventListener("click", ( () => {
    ea("#filter-setup-modal")
}
)),
x.addEventListener("click", ( () => {
    ea("#search-setup-modal")
}
)),
H.addEventListener("click", ( () => {
    ea("#keyword-setup-modal")
}
)),
V.addEventListener("click", (async () => {
    const e = document.getElementById("keyword-niche").value.trim()
      , a = document.getElementById("keyword-product").value.trim();
    if (!e || !a)
        return void alert("Preencha todos os campos.");
    const s = Bt()
      , o = !Y.checked
      , r = new URL("https://chatgpt.com/");
    r.searchParams.append("q", s.format({
        niche: e,
        productType: a
    })),
    r.searchParams.append("temporary-chat", o);
    const i = r.href;
    await t("generate", "generateKeywordFromPopup", {
        url: i
    }, void 0, document.body),
    window.open(i, "_blank")
}
)),
l.addEventListener("click", ( () => {
    o("ExtensionError", document.body)
}
)),
m.addEventListener("click", ( () => {
    o("SearchError", document.body)
}
)),
p.addEventListener("click", ( () => {
    o("CustomError", document.body)
}
));
const Ft = async () => {
    const e = kt();
    if (!e?.isLoggedIn) {
        const e = await chrome.storage.local.get(["showWelcomeMessage"]);
        (void 0 === e.showWelcomeMessage || e.showWelcomeMessage) && $(j).modal("show")
    }
}
  , Ht = () => {
    $(j).modal("hide")
}
;
K.addEventListener("change", (async () => {
    await chrome.storage.local.set({
        showWelcomeMessage: K.checked
    })
}
)),
W.addEventListener("click", ( () => {
    Wt()
}
)),
z.addEventListener("click", ( () => {
    zt()
}
));
const Vt = async e => new Promise(( (t, a) => {
    const s = async () => {
        try {
            const a = await chrome.tabs.sendMessage(e.tabs[0].id, {
                type: "IS_READY"
            });
            t(a)
        } catch (e) {
            setTimeout(s, 25 * n.DEFAULT_DELAY_MS)
        }
    }
    ;
    s()
}
))
  , Yt = (e, t) => {
    chrome.windows.create({
        url: e,
        type: "popup",
        width: 528,
        height: 720
    }).then((async e => {
        await Vt(e);
        try {
            n[n.MODE].DEBUG;
            const a = await chrome.tabs.sendMessage(e.tabs[0].id, {
                type: t
            });
            n[n.MODE].DEBUG,
            chrome.windows.remove(e.id),
            Ve(),
            await ka(a),
            Ye(),
            n[n.MODE].DEBUG,
            Ht()
        } catch (e) {
            n[n.MODE].DEBUG
        }
    }
    )).catch((e => {
        n[n.MODE].DEBUG,
        ca()
    }
    ))
}
  , jt = async (a, s, o={}) => {
    let r = mt() || await e();
    r && await t(a, s, {
        url: r.url,
        ...o
    })
}
  , Wt = async () => {
    jt("popup", "popupSignIn"),
    Yt(n[n.MODE].SIGNIN_URL + "?utm_source=copycat_ads_user&utm_medium=signin_button_popup", "WAIT_TOKENS")
}
  , zt = () => {
    jt("popup", "popupSignUp"),
    Yt(n[n.MODE].SIGNUP_URL + "?utm_source=copycat_ads_user&utm_medium=signup_button_popup", "WAIT_TOKENS")
}
  , Kt = () => {
    jt("popup", "popupViewPlans"),
    window.open(n[n.MODE].SUBSCRIBE_URL + "&utm_source=copycat_ads_user&utm_medium=subscribe_button", "_blank")
}
;
y.addEventListener("click", ( () => {
    Wt()
}
)),
v.addEventListener("click", ( () => {
    zt()
}
)),
g.addEventListener("click", ( () => {
    Kt()
}
)),
b.addEventListener("click", ( () => {
    jt("popup", "popupViewProfile"),
    window.open(n[n.MODE].PROFILE_URL + "?utm_source=copycat_ads_user&utm_medium=profile_button", "_blank")
}
)),
L.addEventListener("click", (async () => {
    jt("popup", "popupSignOut"),
    Yt(n[n.MODE].PROFILE_URL + "?utm_source=copycat_ads_user&utm_medium=signout_button_popup", "REMOVE_TOKENS")
}
)),
h.addEventListener("click", ( () => {
    Wt()
}
)),
E.addEventListener("click", ( () => {
    zt()
}
)),
D.addEventListener("click", ( () => {
    jt("popup", "popupValidate"),
    window.open(n[n.MODE].PROFILE_URL + "?utm_source=copycat_ads_user&utm_medium=resend_button", "_blank")
}
)),
f.addEventListener("click", ( () => {
    jt("popup", "popupUpdateValidation"),
    Nt(),
    Pt("not-active", (e => e?.isLoggedIn && !e?.isActive && !e?.isAuthorized))
}
)),
w.addEventListener("click", ( () => {
    Kt()
}
)),
T.addEventListener("click", ( () => {
    jt("popup", "popupUpdateSubscription"),
    Nt(),
    Pt("not-subscribed", (e => e?.isLoggedIn && e?.isActive && !e?.isAuthorized))
}
)),
A.addEventListener("click", ( () => {
    window.open(n[n.MODE].ORIGIN_URL + "?utm_source=copycat_ads_user&utm_medium=social_button", "_blank")
}
)),
O.addEventListener("click", ( () => {
    window.open(n.IG_URL, "_blank")
}
)),
U.addEventListener("click", ( () => {
    window.open(n.YT_URL, "_blank")
}
)),
M.addEventListener("click", ( () => {
    window.open(n.TT_URL, "_blank")
}
)),
R.addEventListener("click", ( () => {
    o("ExtensionFooter", document.body)
}
)),
C.addEventListener("change", ( () => {
    let e = Gt(C, "anúncio", 0);
    xt("activeAds", e)
}
)),
C.addEventListener("click", ( () => {
    C.select()
}
)),
I.addEventListener("change", ( () => {
    xt("filterBy", I.value)
}
)),
q.addEventListener("change", ( () => {
    xt("sortBy", q.value)
}
)),
B.addEventListener("change", ( () => {
    xt("automaticSearch", B.checked),
    ga()
}
)),
N.addEventListener("change", ( () => {
    let e = Gt(N, "minuto", 0);
    xt("pauseTime", e)
}
)),
N.addEventListener("click", ( () => {
    N.select()
}
)),
P.addEventListener("change", ( () => {
    let e = Gt(P, "segundo", 5);
    xt("scrollTime", e)
}
)),
P.addEventListener("click", ( () => {
    P.select()
}
)),
F.addEventListener("change", ( () => {
    xt("searchNotification", F.checked)
}
)),
S.addEventListener("click", (async () => {
    Zt()
}
)),
_.addEventListener("click", ( () => {
    pa()
}
));
const Xt = (e, t) => {
    let a = !0;
    return null != t && (a = !1,
    ["#automatic-search", "#search-notification"].includes(e) && (document.querySelector(e).checked = t),
    document.querySelector(e).value = t),
    document.querySelector(e).dispatchEvent(new Event("change")),
    a
}
;
document.addEventListener("DOMContentLoaded", (async () => {
    try {
        let a = mt() || await e();
        if (!a)
            return;
        if (n[n.MODE].DEBUG,
        await t("view", "viewPopup", {
            url: a.url
        }),
        a.url.includes("facebook.com/ads/library/"))
            chrome.storage.sync.get(null, (function(e) {
                let t = {
                    "#active-ads": null,
                    "#filter-by": null,
                    "#sort-by": null,
                    "#automatic-search": null,
                    "#pause-time": null,
                    "#scroll-time": null,
                    "#search-notification": null
                };
                if (e[a.id]) {
                    t = {
                        "#active-ads": e[a.id].activeAds,
                        "#filter-by": e[a.id].filterBy,
                        "#sort-by": e[a.id].sortBy,
                        "#automatic-search": e[a.id].automaticSearch,
                        "#pause-time": e[a.id].pauseTime,
                        "#scroll-time": e[a.id].scrollTime,
                        "#search-notification": e[a.id].searchNotification
                    };
                    let s = e[a.id].isSearching;
                    ha(s)
                }
                for (const [e,a] of Object.entries(t)) {
                    Xt(e, a);
                    n[n.MODE].DEBUG
                }
            }
            ));
        else {
            let e = Q.parentElement;
            e.removeChild(Q),
            e.insertAdjacentHTML("beforeend", '\n                <div class="row">\n                    <div class="col-12">\n                        <div class="title">\n                            Esta não é uma página da Biblioteca de Anúncios do Facebook.\n                        </div>\n                    </div>\n                </div>\n            ');
            let t = "180px";
            document.body.style.height = t,
            document.getElementsByTagName("html")[0].style.height = t
        }
    } catch (e) {
        n[n.MODE].DEBUG
    }
}
));
const Qt = e => 1e3 * e
  , Jt = e => Qt(60 * e)
  , Zt = async () => {
    S.disabled = !0;
    const t = r(document.body);
    Ve();
    let a = await ka();
    if (Ye(),
    n[n.MODE].DEBUG,
    !a?.isAuthorized)
        return i(t, document.body),
        void (S.disabled = !1);
    let s = parseInt(C.value)
      , o = I.value
      , c = q.value
      , d = B.checked
      , u = d
      , l = parseInt(N.value)
      , m = parseInt(P.value)
      , p = Jt(l)
      , h = Qt(m)
      , E = F.checked;
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG,
    n[n.MODE].DEBUG;
    let y = mt() || await e();
    if (!y)
        return i(t, document.body),
        void (S.disabled = !1);
    await chrome.tabs.sendMessage(y.id, {
        type: "SEARCH_UPDATE",
        activeAds: s,
        filterBy: o,
        sortBy: c,
        automaticSearch: d,
        isSearching: u,
        pauseTime: p,
        scrollTime: h,
        searchNotification: E
    }),
    i(t, document.body),
    S.disabled = !1,
    chrome.storage.sync.set({
        [y.id]: {
            activeAds: s,
            filterBy: o,
            sortBy: c,
            automaticSearch: d,
            isSearching: u,
            pauseTime: l,
            scrollTime: m,
            searchNotification: E
        }
    }).then(( () => {}
    )),
    ha(u),
    u && (we(p),
    ge())
}
  , ea = e => {
    fe() && $(e).modal("show")
}
  , ta = e => {
    const {filteredAdCount: t, totalAdCount: a, isSearching: s} = e;
    "number" == typeof t && "number" == typeof a && ($("#search-result-title-status").addClass(s ? "spinner-grow" : "check-icon"),
    $("#search-result-title-status").removeClass(s ? "check-icon" : "spinner-grow"),
    $("#search-result-title-status").removeClass("cross-icon"),
    $("#search-result-title").text(s ? "Minerando..." : "Resultado"),
    $("#search-result-text").text(`Anúncios analisados: ${a} \n Anúncios encontrados: ${t}`),
    $("#search-support-div").addClass("hide"),
    ea("#search-result-modal"))
}
  , aa = () => {
    $("#search-result-title-status").addClass("spinner-grow"),
    $("#search-result-title-status").removeClass("check-icon"),
    $("#search-result-title-status").removeClass("cross-icon"),
    $("#search-result-title").text("Processando..."),
    $("#search-result-text").text("Por favor, aguarde... Estamos processando e ordenando os resultados"),
    $("#search-support-div").addClass("hide"),
    ea("#search-result-modal")
}
  , sa = () => {
    $("#search-result-title-status").addClass("cross-icon"),
    $("#search-result-title-status").removeClass("spinner-grow"),
    $("#search-result-title-status").removeClass("check-icon"),
    $("#search-result-title").text("Erro Encontrado"),
    $("#search-result-text").text("Ops! Ocorreu um imprevisto. Tente novamente ou entre em contato com o suporte"),
    $("#search-support-div").removeClass("hide"),
    ea("#search-result-modal")
}
  , oa = () => {
    $("#search-result-title-status").addClass("cross-icon"),
    $("#search-result-title-status").removeClass("check-icon"),
    $("#search-result-title-status").removeClass("spinner-grow"),
    $("#search-result-title").text("Nada Encontrado"),
    $("#search-result-text").text("Nenhum anúncio foi encontrado para essa pesquisa. Pesquise por um termo diferente"),
    $("#search-support-div").addClass("hide"),
    ea("#search-result-modal")
}
  , ra = () => {
    $("#search-result-title-status").addClass("check-icon"),
    $("#search-result-title-status").removeClass("spinner-grow"),
    $("#search-result-title-status").removeClass("cross-icon"),
    $("#search-result-title").text("Pesquisa Completa"),
    $("#search-result-text").text('Não há mais anúncios para carregar. Pesquise por um termo diferente ou desative a "Pesquisa automática"'),
    $("#search-support-div").addClass("hide"),
    ea("#search-result-modal")
}
  , ia = () => {
    $("#search-result-title-status").addClass("cross-icon"),
    $("#search-result-title-status").removeClass("spinner-grow"),
    $("#search-result-title-status").removeClass("check-icon"),
    $("#search-result-title").text("Erro Encontrado"),
    $("#search-result-text").text('Feche as páginas da Biblioteca de Anúncios, remova os cookies de "facebook.com" nas configurações do navegador e tente abrir a Biblioteca de Anúncios novamente'),
    $("#search-support-div").removeClass("hide"),
    ea("#search-result-modal")
}
  , na = () => {
    $("#search-result-title-status").addClass("cross-icon"),
    $("#search-result-title-status").removeClass("spinner-grow"),
    $("#search-result-title-status").removeClass("check-icon"),
    $("#search-result-title").text("Erro Encontrado"),
    $("#search-result-text").text("O Copycat Ads não foi carregado corretamente. Pode ser interferência de outra extensão. Crie um novo perfil no Chrome, instale apenas o Copycat Ads nesse novo perfil e tente novamente."),
    $("#search-support-div").removeClass("hide"),
    ea("#search-result-modal")
}
  , ca = () => {
    $("#search-result-title-status").addClass("cross-icon"),
    $("#search-result-title-status").removeClass("spinner-grow"),
    $("#search-result-title-status").removeClass("check-icon"),
    $("#search-result-title").text("Erro Encontrado"),
    $("#search-result-text").text("Erro no pop-up de autenticação. Habilite a permissão de pop-up nessa página, recarregue a Biblioteca de Anúncios e tente novamente. Se o erro persistir, reinstale a extensão ou entre em contato com o suporte."),
    $("#search-support-div").removeClass("hide"),
    ea("#search-result-modal")
}
  , da = () => {
    $("#search-result-modal").modal("hide")
}
  , ua = (e, t="") => {
    const a = {
        logout: {
            title: "Sessão Expirada ou Encerrada",
            text: "Sua sessão expirou ou foi encerrada. Por favor, entre novamente!"
        },
        updating: {
            title: "Atualizando...",
            text: "Por favor, aguarde... Estamos atualizando os seus dados"
        },
        "not-active": {
            title: "Conta Não Validada",
            text: 'Valide a sua conta clicando no link do email de boas-vindas. Se não tiver recebido o email, clique em "Validar" e, na nova página aberta, clique em "Reenviar". Qualquer dúvida entre em contato com o suporte.'
        },
        "not-subscribed": {
            title: "Assinatura Não Encontrada",
            text: "Não encontramos nenhuma assinatura do Copycat Ads associada ao seu perfil de usuário. Qualquer dúvida entre em contato com o suporte."
        },
        notification: {
            title: "Notificação",
            text: t
        }
    };
    a[e] && ("restarting" !== e ? ($("#custom-alert-title-status").addClass("cross-icon"),
    $("#custom-alert-title-status").removeClass("spinner-grow"),
    $("#custom-alert-title-status").removeClass("check-icon"),
    e.includes("not-") ? $("#custom-support-div").removeClass("hide") : $("#custom-support-div").addClass("hide")) : ($("#custom-alert-title-status").removeClass("cross-icon"),
    $("#custom-alert-title-status").addClass("spinner-grow"),
    $("#custom-alert-title-status").removeClass("check-icon")),
    $("#custom-alert-title").text(a[e].title),
    $("#custom-alert-text").text(a[e].text),
    ea("#custom-alert-modal"))
}
  , la = () => {
    $("#custom-alert-modal").modal("hide")
}
  , ma = () => {
    F.checked && le.play()
}
  , pa = async (t=!1, a=!0) => {
    _.disabled = !0;
    const s = r(document.body);
    Te(),
    ye(),
    t && ma();
    let o = mt() || await e();
    if (!o)
        return i(s, document.body),
        void (_.disabled = !1);
    await chrome.tabs.sendMessage(o.id, {
        type: "PAUSE",
        processResultsFlow: a
    }),
    i(s, document.body),
    _.disabled = !1,
    xt("isSearching", !1),
    ha(!1)
}
  , ha = async t => {
    t ? (S.parentElement.parentElement.classList.add("hide"),
    _.parentElement.parentElement.classList.remove("hide"),
    C.disabled = !0,
    I.disabled = !0,
    he.disabled = !0,
    q.disabled = !0,
    Ee.disabled = !0,
    B.disabled = !0,
    N.disabled = !0,
    P.disabled = !0,
    F.disabled = !0) : (_.parentElement.parentElement.classList.add("hide"),
    S.parentElement.parentElement.classList.remove("hide"),
    C.disabled = !1,
    I.disabled = !1,
    he.disabled = !1,
    q.disabled = !1,
    Ee.disabled = !1,
    B.disabled = !1,
    N.disabled = !1,
    P.disabled = !1,
    F.disabled = !1);
    let a = mt() || await e();
    a && chrome.runtime.sendMessage({
        type: "ICON",
        tabId: a.id,
        state: t ? "searching" : "enabled"
    })
}
  , Ea = async () => {
    "parentIFrame"in window && (parentIFrame.autoResize(!1),
    await parentIFrame.size(Ot()),
    parentIFrame.autoResize(!0))
}
  , ya = e => {
    ua("notification", e)
}
  , ga = () => {
    _t().includes("app") && va(!0)
}
  , va = (e=!1) => {
    n[n.MODE].DEBUG,
    J.classList.add("hide"),
    Z.classList.add("hide"),
    ee.classList.add("hide"),
    te.classList.add("hide"),
    ae.classList.remove("hide");
    const t = S.querySelector(".btn-text")
      , a = S.querySelector(".btn-icon");
    if (B.checked ? (t.textContent = "Pesquisar",
    a.classList.remove("filter-icon"),
    a.classList.add("play-icon"),
    a.classList.remove("hide"),
    G.classList.remove("hide"),
    St("app-expanded")) : (a.classList.remove("play-icon"),
    a.classList.add("filter-icon"),
    a.classList.remove("hide"),
    t.textContent = "Filtrar",
    G.classList.add("hide"),
    St("app")),
    e) {
        let e = It();
        e?.tierLimitReached && (a.classList.remove("play-icon"),
        a.classList.remove("filter-icon"),
        a.classList.add("hide"),
        t.textContent = "Como aumentar limite?")
    }
    be() && Ea()
}
  , ba = () => {
    n[n.MODE].DEBUG,
    J.classList.add("hide"),
    Z.classList.add("hide"),
    ee.classList.remove("hide"),
    te.classList.add("hide"),
    ae.classList.add("hide"),
    St("noauth"),
    be() && Ea()
}
  , La = () => {
    n[n.MODE].DEBUG,
    J.classList.add("hide"),
    Z.classList.add("hide"),
    ee.classList.add("hide"),
    te.classList.remove("hide"),
    ae.classList.add("hide"),
    St("noauth"),
    be() && Ea()
}
  , Da = () => {
    n[n.MODE].DEBUG,
    J.classList.add("hide"),
    Z.classList.remove("hide"),
    ee.classList.add("hide"),
    te.classList.add("hide"),
    ae.classList.add("hide"),
    St("login"),
    be() && Ea()
}
  , fa = () => {
    n[n.MODE].DEBUG,
    se.classList.remove("hide");
    let e = kt();
    e?.isLoggedIn ? (re.classList.remove("hide"),
    oe.classList.add("hide"),
    e?.isPremiumUser ? (g.classList.add("hide"),
    b.classList.remove("hide")) : (g.classList.remove("hide"),
    b.classList.add("hide"))) : (re.classList.add("hide"),
    oe.classList.remove("hide"))
}
  , wa = () => {
    n[n.MODE].DEBUG,
    ie.classList.remove("hide");
    let e = kt();
    ne.textContent = e?.usageString || "";
    const t = document.querySelector("#info-usage-alert");
    ne.textContent.trim() ? t.classList.remove("hide") : t.classList.add("hide"),
    e?.tierLimitReached || !isNaN(parseInt(e.tier)) && (e.tier - e.usage) / e.tier <= .4 ? (ne.style.color = "red",
    g.classList.add("btn-pulse")) : (ne.removeAttribute("style"),
    g.classList.remove("btn-pulse")),
    e?.notification && ya(e?.notification)
}
  , Ta = () => {
    fa(),
    wa(),
    Ct() && (Pt("logout", (e => !e?.isLoggedIn), 10),
    Rt(!1))
}
  , Sa = () => {
    n[n.MODE].DEBUG,
    J.classList.remove("hide"),
    Z.classList.add("hide"),
    ee.classList.add("hide"),
    te.classList.add("hide"),
    ae.classList.add("hide"),
    St("error"),
    be() && Ea()
}
  , _a = () => {
    n[n.MODE].DEBUG,
    ue.classList.remove("hide")
}
  , Aa = () => {
    if ("boolean" != typeof it())
        return void n[n.MODE].DEBUG;
    let e = kt();
    n[n.MODE].DEBUG,
    Ta(),
    ct() || ot() ? (n[n.MODE].DEBUG,
    Sa()) : e?.isAuthorized ? va() : e?.isAuthorized || !e?.isLoggedIn || e?.isActive ? !e?.isAuthorized && e?.isLoggedIn ? La() : Da() : ba(),
    _a()
}
  , Oa = () => {
    dt(!0),
    Aa(),
    jt("popup", "popupRender", {
        status: "errorServer"
    })
}
  , Ua = function() {
    dt(!1)
}
  , Ma = () => {
    rt(!0),
    Aa(),
    jt("popup", "popupRender", {
        status: "errorLoading"
    })
}
  , Ra = function() {
    rt(!1),
    clearTimeout(me.forceRenderLoadingErrorTimeout),
    me.forceRenderLoadingErrorTimeout = null
}
  , Ca = function() {
    me.forceRenderLoadingErrorTimeout ? n[n.MODE].DEBUG : me.forceRenderLoadingErrorTimeout = setTimeout(Ma, n.MAX_LOADING_TIME_MS)
}
  , ka = async t => {
    n[n.MODE].DEBUG,
    Ut(null);
    let a = document.querySelector("#silent-auth");
    const s = function() {
        if (Ze())
            return void n[n.MODE].DEBUG;
        n[n.MODE].DEBUG,
        et(!0),
        Je(!1),
        Fe();
        const e = Date.now();
        a.src = n[n.MODE].PROFILE_URL + "?utm_source=copycat_ads_user&utm_medium=silent_auth_iframe&nocache=" + e
    }
      , o = function() {
        if (n[n.MODE].DEBUG,
        !me.reloadIframeTimeout && at() < n.MAX_RELOAD_ATTEMPTS && (n[n.MODE].DEBUG,
        me.reloadIframeTimeout = setTimeout(( () => {
            s(),
            tt(),
            me.reloadIframeTimeout && (clearTimeout(me.reloadIframeTimeout),
            me.reloadIframeTimeout = null)
        }
        ), n.RETRY_RATE_MS)),
        at() === n.MAX_RELOAD_ATTEMPTS && (n[n.MODE].DEBUG,
        je() || Ge())) {
            Ut({}),
            Ma()
        }
    }
      , r = function(e=10 * n.DEFAULT_DELAY_MS) {
        me.sendAuthMessageToIframeTimeout ? n[n.MODE].DEBUG : Qe() && (me.sendAuthMessageToIframeTimeout = setTimeout(i, e))
    }
      , i = async function() {
        if (await ut(),
        it())
            t ? (n[n.MODE].DEBUG,
            a.contentWindow.postMessage({
                type: "SET_AUTH",
                tokens: t || null
            }, n[n.MODE].PROFILE_URL)) : (n[n.MODE].DEBUG,
            a.contentWindow.postMessage({
                type: "GET_AUTH"
            }, n[n.MODE].PROFILE_URL)),
            Ca();
        else if (o(),
        je() || Ge()) {
            Ut({}),
            Oa()
        }
        clearTimeout(me.sendAuthMessageToIframeTimeout),
        me.sendAuthMessageToIframeTimeout = null
    };
    if (a)
        Ge() ? await ke() && s() : r();
    else {
        a = document.createElement("iframe");
        const t = Date.now();
        a.src = n[n.MODE].PROFILE_URL + "?utm_source=copycat_ads_user&utm_medium=silent_auth_iframe&nocache=" + t,
        a.id = "silent-auth",
        a.width = "1",
        a.height = "1",
        a.setAttribute("cache-control", "no-cache, no-store, must-revalidate"),
        a.setAttribute("pragma", "no-cache"),
        a.setAttribute("expires", "0"),
        a.onload = function() {
            n[n.MODE].DEBUG,
            et(!1),
            Je(!0),
            r()
        }
        ,
        document.body.appendChild(a),
        window.addEventListener("message", (async t => {
            if (Qe() && (e => "object" == typeof e?.data?.AUTH_DATA)(t) && t.origin === n[n.MODE].ORIGIN_URL && t.source === a.contentWindow)
                try {
                    Ua(),
                    Ra(),
                    n[n.MODE].DEBUG;
                    let a = {}
                      , s = mt() || await e();
                    if (!s)
                        return;
                    let i = t.data.AUTH_DATA;
                    if (Ge() && Object.keys(i).length) {
                        if (!He(i) && Pe() < n.MAX_UPDATE_ATTEMPTS)
                            return n[n.MODE].DEBUG,
                            r(1e3),
                            void Ne();
                        if (!He(i))
                            return void o()
                    }
                    if (a = await ze(i),
                    !a?.isAuthorized && (n[n.MODE].DEBUG,
                    a = await chrome.tabs.sendMessage(s.id, {
                        type: "VERIFY_AUTH",
                        tokens: i
                    }),
                    !a?.isLoggedIn && Object.keys(a.tokens).length))
                        return n[n.MODE].DEBUG,
                        void o();
                    st(),
                    (!Ge() || Ce() || qe()) && (Ut(a),
                    Mt() && Ke(),
                    Ge() || (a?.isAuthorized ? (n[n.MODE].DEBUG,
                    chrome.tabs.sendMessage(s.id, {
                        type: "START"
                    })) : (n[n.MODE].DEBUG,
                    chrome.tabs.sendMessage(s.id, {
                        type: "STOP"
                    })),
                    Aa(),
                    jt("popup", "popupRender", {
                        status: _t()
                    })))
                } catch (e) {
                    n[n.MODE].DEBUG
                }
        }
        ))
    }
    return new Promise(( (e, t) => {
        const a = async () => {
            let t = kt();
            if ((je() || Ge() && Ce() || Ge() && !Ce() && qe()) && t)
                return n[n.MODE].DEBUG,
                e(t),
                Ie(!1),
                void Re(!1);
            if (Ge() && !Ce()) {
                await Be() && r()
            }
            setTimeout(a, 30 * n.DEFAULT_DELAY_MS)
        }
        ;
        a()
    }
    ))
}
  , Ia = (e, t, a) => e && t ? (e.postMessage(a, t),
n[n.MODE].DEBUG,
!0) : (n[n.MODE].DEBUG,
!1)
  , qa = e => {
    const {source: t, origin: a} = e;
    Ia(t, a, {
        type: "READY_SIGNAL",
        success: !0
    }) && (n[n.MODE].DEBUG,
    vt(t, a))
}
  , Ba = (e, t=10) => {
    let a = 0;
    return new Promise(( (s, o) => {
        const r = async () => {
            const {source: i, origin: c} = bt();
            Ia(i, c, {
                ...e,
                type: "SET_CONFIG"
            }) ? s(!0) : a++ < t ? setTimeout(r, 30 * n.DEFAULT_DELAY_MS) : o(!1)
        }
        ;
        r()
    }
    ))
}
;
window.addEventListener("message", (async e => {
    if (e.origin.includes("facebook.com") && n.REGEX_URL.test(e.origin) && e.data.type && (n[n.MODE].DEBUG,
    Dt(e.data.uuid) || gt(e.data.uuid) || ["INITIATE_TAB"].includes(e.data.type) || await ht())) {
        if ("INITIATE_AUTH" === e.data.type || "UPDATE_AUTH" === e.data.type) {
            Ve();
            await ka();
            "INITIATE_AUTH" === e.data.type && await Ft(),
            Ye()
        } else if ("UPDATE_TOKEN" === e.data.type && e.data.tokens) {
            Ve();
            await ka(e.data.tokens);
            Ye()
        } else
            "UPDATE_USAGE" === e.data.type ? (Ut(e.data.authData),
            Ta(),
            _t().includes("app") && va(!0)) : "STOP_SEARCH" === e.data.type ? pa(e.data.notifyFlow, e.data.processResultsFlow) : "SHOW_RESULT" === e.data.type ? ta(e.data) : "SHOW_WAIT" === e.data.type ? aa() : "SHOW_ERROR" === e.data.type ? sa() : "SHOW_SEARCH_EMPTY" === e.data.type ? oa() : "SHOW_SEARCH_END" === e.data.type ? ra() : "SHOW_SEARCH_ERROR" === e.data.type ? ia() : "SHOW_EXTENSION_ERROR" === e.data.type ? na() : "END_RESTARTING" === e.data.type ? _e(!1) : "HIDE_MODAL" === e.data.type ? da() : "INITIATE_TAB" === e.data.type ? (lt(e.data.tab),
            yt(e.data.uuid)) : "SET_VISIBILITY" === e.data.type ? ve(e.data.isVisible) : "TOGGLE_VISIBILITY" === e.data.type ? Le() : /^ADD_.*_DATA$/.test(e.data.type) ? Tt(e.data) : "READY_SIGNAL" === e.data.type ? qa(e) : "RELAY_CONFIG" === e.data.type ? Ba(e.data) : "SET_PROMPT" === e.data.type && qt(e.data.prompt);
        wt()
    }
}
));
