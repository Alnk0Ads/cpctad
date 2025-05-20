import {engagementHandlerDefault as e, getOrCreateClientId as t, getOrCreateSessionId as a, openRedirectUrl as o} from "../utils/utils.js";
import {CopycatAdsConfig as s} from "../../config/config.js";
const n = e => {
    let t = new URL(e);
    const a = !!(t.searchParams.get("q") || t.searchParams.get("view_all_page_id") || t.searchParams.get("id"))
      , o = !!t.searchParams.get("search_type")
      , s = !!t.searchParams.get("country")
      , n = !!t.searchParams.get("active_status")
      , i = !!t.searchParams.get("ad_type")
      , r = !!t.searchParams.get("media_type");
    return a && o && s && n && i && r
}
;
function i(e, t, a={}) {
    const {ignoreParams: o, ignoreParamsAdded: s, ignoreParamsRemoved: n, ignoreParamsModified: i, ignoreAllAdded: r, ignoreAllRemoved: c, ignoreAllModified: d} = a
      , l = new URLSearchParams(e.search)
      , u = new URLSearchParams(t.search)
      , m = {
        added: {},
        removed: {},
        modified: {}
    };
    for (const [e,t] of l.entries())
        if (u.has(e)) {
            if (u.get(e) !== t) {
                if (i && o?.includes(e) || d)
                    continue;
                m.modified[e] = {
                    oldValue: t,
                    newValue: u.get(e)
                }
            }
        } else {
            if (n && o?.includes(e) || c)
                continue;
            m.removed[e] = t
        }
    for (const [e,t] of u.entries())
        if (!l.has(e)) {
            if (s && o?.includes(e) || r)
                continue;
            m.added[e] = t
        }
    return m
}
const r = (e, t) => {
    if (e === t)
        return !0;
    const a = new URL(e)
      , o = new URL(t);
    if (a.origin + a.pathname === o.origin + o.pathname) {
        const e = i(a, o, {
            ignoreParams: ["sort_data[direction]", "sort_data[mode]"],
            ignoreParamsAdded: !0,
            ignoreParamsRemoved: !0,
            ignoreParamsModified: !1
        });
        if (!Object.keys(e.added).length && !Object.keys(e.removed).length && !Object.keys(e.modified).length)
            return !0
    }
    return !1
}
  , c = async function(e, t) {
    let a = {};
    switch (e) {
    case "default":
        a.path = {
            32: "../../assets/alt/32/logo.png",
            48: "../../assets/alt/48/logo.png",
            64: "../../assets/alt/64/logo.png"
        };
        break;
    case "disabled":
        a.path = {
            32: "../../assets/alt/32/logo-disabled.png",
            48: "../../assets/alt/48/logo-disabled.png",
            64: "../../assets/alt/64/logo-disabled.png"
        };
        break;
    case "enabled":
        a.path = {
            32: "../../assets/alt/32/logo-enabled.png",
            48: "../../assets/alt/48/logo-enabled.png",
            64: "../../assets/alt/64/logo-enabled.png"
        };
        break;
    case "searching":
        a.path = {
            32: "../../assets/alt/32/logo-searching.png",
            48: "../../assets/alt/48/logo-searching.png",
            64: "../../assets/alt/64/logo-searching.png"
        };
        break;
    default:
        break
    }
    t && (a.tabId = t),
    await chrome.action.setIcon(a)
};
let d = []
  , l = {};
const u = async (t, a) => {
    d.push(t),
    l[t] = a,
    await e("adlib", "adlibSearch", {
        url: a
    }, w)
}
  , m = async e => {
    if (d.includes(e)) {
        s[s.MODE].DEBUG,
        d = d.filter((t => t !== e)),
        delete l[e];
        try {
            s[s.MODE].DEBUG;
            await chrome.tabs.sendMessage(e, {
                type: "STOP"
            });
            s[s.MODE].DEBUG
        } catch (e) {
            s[s.MODE].DEBUG
        }
    }
}
  , p = e => e.url && e.url.includes("facebook.com/ads/library/") && d.includes(e.id);
let E = [];
const g = e => {
    s[s.MODE].DEBUG,
    E.push(e)
}
  , h = e => {
    E.includes(e) && (s[s.MODE].DEBUG,
    E = E.filter((t => t !== e)))
}
  , f = () => {
    E.forEach((async e => {
        try {
            await chrome.tabs.sendMessage(e, {
                type: "REMOVE_TOKENS_RELOAD"
            }),
            s[s.MODE].DEBUG
        } catch (t) {
            h(e),
            s[s.MODE].DEBUG
        }
    }
    ))
}
  , D = (e, t, a=s.VERSION) => {
    chrome.runtime.setUninstallURL(s[s.MODE].API_UNINSTALL_URL.format({
        clientId: e,
        sessionId: t,
        extensionVersion: a
    })),
    s[s.MODE].DEBUG
}
  , y = e => {
    const {isLoggedIn: t, isActive: a, isAuthorized: o, usage: s, tier: n, tierLimitReached: i, interval: r, eventTypes: c, success: d} = e || {};
    return "boolean" == typeof t && "boolean" == typeof a && "boolean" == typeof o && "string" == typeof s && "string" == typeof n && "boolean" == typeof i && "string" == typeof r && "object" == typeof c && "boolean" == typeof d
}
  , v = e => e?.usage && e?.tier ? `Usos restantes: ${e.tierLimitReached ? "0 - Limite esgotado" : isNaN(parseInt(e.tier)) ? e.tier : e.tier - e.usage}` : ""
  , b = async e => {
    s[s.MODE].DEBUG;
    const t = s[s.MODE].API_AUTH_URL
      , a = {
        method: "GET",
        headers: {
            "x-api-version": "1.0",
            "x-extension-version": s.VERSION
        }
    };
    e?.tokens?.accessToken && (a.headers["x-access-token"] = e?.tokens?.accessToken);
    try {
        const o = await fetch(t, a)
          , n = await o.json();
        s[s.MODE].DEBUG;
        const {result: i} = n;
        return y(i) ? {
            tokens: e.tokens,
            usageString: v(i),
            ...i
        } : (s[s.MODE].DEBUG,
        {})
    } catch (e) {
        return s[s.MODE].DEBUG,
        {}
    }
}
  , U = async e => {
    s[s.MODE].DEBUG;
    const t = s[s.MODE].API_CONFIG_URL
      , a = {
        method: "GET",
        headers: {
            "x-api-version": "1.0",
            "x-extension-version": s.VERSION
        }
    };
    e?.tokens?.accessToken && (a.headers["x-access-token"] = e?.tokens?.accessToken);
    try {
        const e = await fetch(t, a)
          , o = await e.json();
        s[s.MODE].DEBUG;
        const {result: n} = o;
        return n || {}
    } catch (e) {
        return s[s.MODE].DEBUG,
        {}
    }
}
;
class M {
    constructor() {
        this.queue = [],
        this.locked = !1
    }
    async acquire() {
        this.locked ? await new Promise((e => this.queue.push(e))) : this.locked = !0
    }
    release() {
        if (this.queue.length > 0) {
            this.queue.shift()()
        } else
            this.locked = !1
    }
}
const O = {}
  , A = {}
  , S = new M
  , P = new M
  , I = (e, t=3e3) => {
    for (const a in e)
        Date.now() - e[a]?.timestamp > t && delete e[a]
}
  , T = async (e, t, a, o, s=3e3) => {
    await o.acquire(),
    I(a, s);
    const n = JSON.stringify(e?.tokens || {});
    return a[n] && "object" == typeof a[n] || (a[n] = {},
    a[n].data = await t(e),
    a[n].timestamp = Date.now()),
    o.release(),
    a[n].data
}
  , w = async e => {
    s[s.MODE].DEBUG;
    const o = s[s.MODE].API_ENGAGEMENT_URL;
    e.payload.clientId = await t(),
    e.payload.sessionId = await a(),
    D(e.payload.clientId, e.payload.sessionId);
    const n = {
        method: "POST",
        headers: {
            "content-type": "application/json",
            "x-api-version": "1.0",
            "x-extension-version": s.VERSION
        },
        body: JSON.stringify(e.payload)
    };
    e?.tokens?.accessToken && (n.headers["x-access-token"] = e?.tokens?.accessToken);
    try {
        const t = await fetch(o, n)
          , a = await t.json();
        s[s.MODE].DEBUG;
        const {result: i, success: r} = a;
        return y(i) ? {
            tokens: e.tokens,
            usageString: v(i),
            ...i
        } : (s[s.MODE].DEBUG,
        {})
    } catch (e) {
        return s[s.MODE].DEBUG,
        {}
    }
}
  , G = async () => E.length > 0 ? await chrome.tabs.sendMessage(E[0], {
    type: "GET_TOKENS"
}) : null;
let R = []
  , _ = []
  , x = !1;
const B = () => d.every((e => _.includes(e)))
  , k = e => {
    0 === R.length && (R.push(e),
    x = !1),
    _.push(e)
}
  , F = e => {
    R[0] === e && (R.pop(),
    x = !0),
    _.filter((t => t !== e))
}
  , L = e => R.includes(e)
  , N = e => _.includes(e)
  , q = async e => new Promise((t => {
    const a = () => {
        B() ? t({
            isRefreshingAuthTab: L(e)
        }) : setTimeout(a, s.DEFAULT_DELAY_MS)
    }
    ;
    a()
}
))
  , C = async e => new Promise((e => {
    const t = () => {
        x ? e({
            isAuthRefreshed: x
        }) : setTimeout(t, s.DEFAULT_DELAY_MS)
    }
    ;
    t()
}
));
chrome.tabs.onUpdated.addListener((async function(e, t, a) {
    if (a.url && a.url.includes("facebook.com/ads/library/")) {
        if (s[s.MODE].DEBUG,
        "complete" === t.status) {
            if (!n(a.url))
                return;
            if (d.includes(e)) {
                if (r(l[e], a.url))
                    return;
                s[s.MODE].DEBUG,
                await m(e),
                await chrome.action.disable(e),
                await c("disabled", e)
            }
            s[s.MODE].DEBUG,
            await u(e, a.url),
            await chrome.action.enable(e),
            await c("enabled", e);
            try {
                chrome.tabs.sendMessage(e, {
                    type: "READY"
                }, (t => {
                    "READY_CONFIRMATION" === t?.type ? s[s.MODE].DEBUG : (s[s.MODE].DEBUG,
                    m(e))
                }
                )),
                s[s.MODE].DEBUG
            } catch (e) {
                s[s.MODE].DEBUG
            }
        }
    } else
        a.url && "loading" === t.status && j(a)
}
)),
chrome.tabs.onRemoved.addListener((function(e, t) {
    d.includes(e) && (s[s.MODE].DEBUG,
    m(e))
}
));
const j = async e => {
    await chrome.action.getPopup({
        tabId: e.id
    }) || (s[s.MODE].DEBUG,
    await chrome.action.setPopup({
        tabId: e.id,
        popup: "/src/action/action.html"
    }))
}
;
chrome.action.onClicked.addListener((e => {
    if (p(e))
        try {
            chrome.tabs.sendMessage(e.id, {
                type: "TOGGLE"
            }),
            s[s.MODE].DEBUG
        } catch (e) {
            s[s.MODE].DEBUG
        }
}
)),
chrome.runtime.onMessage.addListener((function(e, t, a) {
    if (s[s.MODE].DEBUG,
    "ICON" === e?.type)
        c(e.state, e.tabId);
    else if ("TABID" === e?.type)
        a({
            id: t.tab.id,
            url: t.tab.url
        });
    else if ("READY_TABID" === e?.type)
        a({
            isReady: p(e?.tab)
        });
    else {
        if ("AUTH_REQUEST" === e?.type)
            return T(e, b, O, S).then(a),
            !0;
        if ("CONFIG_REQUEST" === e?.type)
            return T(e, U, A, P).then(a),
            !0;
        if ("ENGAGEMENT_REQUEST" === e?.type)
            return w(e).then(a),
            !0;
        if ("UNLOADING" === e?.type)
            d.includes(t.tab.id) && (s[s.MODE].DEBUG,
            m(t.tab.id)),
            (L(t.tab.id) || N(t.tab.id)) && F(t.tab.id);
        else if ("TOKEN_UPDATE_REQUEST" === e?.type)
            d.length > 0 && (s[s.MODE].DEBUG,
            chrome.tabs.sendMessage(d[0], {
                type: "TOKEN_UPDATE",
                tokens: e?.tokens,
                force: e?.force
            }).then(( () => {}
            )).catch((e => {
                s[s.MODE].DEBUG
            }
            )));
        else {
            if ("GET_TOKEN_REQUEST" === e?.type)
                return s[s.MODE].DEBUG,
                G().then(a),
                !0;
            if ("ADD_READY_WEB" === e?.type)
                g(t.tab.id);
            else if ("REMOVE_READY_WEB" === e?.type)
                h(t.tab.id);
            else if ("SIGNOUT_READY_WEB_TABS" === e?.type)
                f();
            else if ("LOCK_REFRESH_AUTH" === e?.type)
                k(t.tab.id);
            else if ("UNLOCK_REFRESH_AUTH" === e?.type)
                F(t.tab.id);
            else {
                if ("SYNC_REFRESH_AUTH_TABS" === e?.type)
                    return q(t.tab.id).then(a),
                    !0;
                if ("SYNC_AUTH_REFRESHED" === e?.type)
                    return C().then(a),
                    !0;
                "SET_PROMPT" === e?.type && H(e.prompt)
            }
        }
    }
}
)),
chrome.runtime.onInstalled.addListener((async t => {
    const {id: a, previousVersion: s, reason: n} = t;
    switch (n) {
    case "install":
        await e("extension", "extensionInstall", {}, w),
        o("Install");
        break;
    case "update":
        await e("extension", "extensionUpdate", {}, w);
        break;
    default:
        break
    }
}
));
const z = {
    prompt: {
        keywordFromSelectionPrompt: "Me dê uma lista de palavras chaves presentes em anúncios do Meta Ads/Facebook Ads do nicho/tipo de produto relacionado ao texto selecionado entre colchetes [{selection}]. Considere que os anunciantes estão usando copywriting persuasivo focado no nicho/tipo de produto mencionado anteriormente e extraia palavras-chaves que possam estar contidas nesses anúncios. Favor listar as palavras-chaves em 3 idiomas: português, inglês e espanhol.",
        segmentationFromSelectionPrompt: "Me dê uma lista de sugestões de segmentação de públicos(interesses, comportamentos, demografia, gênero, faixa etária, localização, etc.) para anúncios do Meta Ads/Facebook Ads do nicho/tipo de produto relacionado ao texto selecionado entre colchetes [{selection}]. Considere que os anunciantes estão utilizando estratégias de segmentação focadas no nicho/tipo de produto mencionado anteriormente e extraia sugestões de públicos que possam estar sendo alvo desses anúncios. Favor listar as sugestões de segmentação em 3 idiomas: português, inglês e espanhol.",
        persuasionAnalysisFromSelectionPrompt: "Analise o conteúdo selecionado entre colchetes [{selection}], seja ele um criativo de anúncio, texto de anúncio ou página de vendas. Identifique e explique as técnicas de copywriting utilizadas, incluindo gatilhos emocionais, prova social, escassez, autoridade e outras estratégias persuasivas. Sugira formas de aprimorar esse texto para aumentar o impacto e a conversão.",
        abTestVariationsFromSelectionPrompt: "Analise o conteúdo selecionado entre colchetes [{selection}], seja ele um criativo de anúncio, texto de anúncio ou página de vendas. Com base nesse material, sugira três variações para testes A/B que otimizem diferentes aspectos da copy. Crie uma versão focada em urgência, outra baseada em curiosidade e uma terceira enfatizando benefícios emocionais do produto/serviço.",
        offerStructureFromSelectionPrompt: "Analise o conteúdo selecionado entre colchetes [{selection}], seja ele um criativo de anúncio, texto de anúncio ou página de vendas. Descreva a estrutura da oferta utilizada, identificando pontos como preço, garantias, bônus, escassez e diferenciais competitivos. Sugira maneiras de tornar essa oferta ainda mais irresistível.",
        customerAvatarFromSelectionPrompt: "Analise o conteúdo selecionado entre colchetes [{selection}], seja ele um criativo de anúncio, texto de anúncio ou página de vendas. Identifique qual é o público-alvo desse material, descrevendo idade, interesses, dores, desejos e objeções do cliente. Sugira como a copy poderia ser ajustada para se comunicar de forma ainda mais eficaz com esse público.",
        creativeAnglesFromSelectionPrompt: "Analise o conteúdo selecionado entre colchetes [{selection}], seja ele um criativo de anúncio, texto de anúncio ou página de vendas. Com base nesse conteúdo, gere quatro ângulos criativos personalizados para anúncios, garantindo que cada um esteja totalmente alinhado à oferta e ao público-alvo relacionados ao conteúdo selecionado.\n\n1️⃣ UGC (Ponto de Vista do Usuário) – Simule um depoimento autêntico de um usuário satisfeito, destacando uma experiência realista com o produto/serviço.\n2️⃣ Solução de uma dor urgente – Apresente a oferta como a resposta direta para um problema específico do público.\n3️⃣ Realização de um desejo aspiracional – Mostre como a oferta ajuda o público a atingir um objetivo desejado.\n4️⃣ Oportunidade única e exclusiva – Crie um senso de urgência e escassez para incentivar a ação imediata.\n\nPara cada ângulo, gere:\n✅ Uma descrição personalizada explicando o contexto e a abordagem do ângulo.\n✅ Cinco hooks persuasivos que devem conter:\n\nTítulo visual curto e impactante (para aparecer no criativo)\n\nFrase chamativa narrada (entre 3 e 5 segundos, feita para capturar atenção rapidamente).\n\nIMPORTANTE: Todos os ângulos e hooks devem ser 100% personalizados com base no conteúdo selecionado entre colchetes. Evite respostas genéricas.",
        quizFunnelFromSelectionPrompt: "Analise o conteúdo selecionado entre colchetes [{selection}], seja ele um criativo de anúncio, texto de anúncio ou página de vendas. Com base nesse material, crie um funil de múltiplas etapas utilizando um quiz interativo para eu modelar e vender esse produto/serviço.\n\nEstruture o quiz com:\n1️⃣ Perguntas iniciais para segmentar o público e aumentar o envolvimento, conectando-as com dores e desejos relevantes.\n2️⃣ Perguntas intermediárias que reforcem o valor do produto/serviço, eliminem objeções e conduzam o lead à solução ideal.\n3️⃣ Pergunta final que direcione o lead para a melhor oferta, levando-o ao checkout para aquisição do produto ou a uma página de captura de leads.\n\nSugira também ganchos persuasivos para a primeira pergunta do quiz e estratégias para maximizar conversões ao final do funil."
    },
    promptEventMap: {
        keywordFromSelectionPrompt: "generateKeywordFromContextMenu",
        segmentationFromSelectionPrompt: "generateSegmentationFromContextMenu",
        persuasionAnalysisFromSelectionPrompt: "generatePersuasionAnalysisFromContextMenu",
        abTestVariationsFromSelectionPrompt: "generateAbTestVariationsFromContextMenu",
        offerStructureFromSelectionPrompt: "generateOfferStructureFromContextMenu",
        customerAvatarFromSelectionPrompt: "generateCustomerAvatarFromContextMenu",
        creativeAnglesFromSelectionPrompt: "generateCreativeAnglesFromContextMenu",
        quizFunnelFromSelectionPrompt: "generateQuizFunnelFromContextMenu"
    }
}
  , H = e => {
    z.prompt = e
}
  , V = e => z.prompt[e] || null
  , Y = e => z.promptEventMap[e] || null
  , K = "copycat-search"
  , Q = "copycat-search-link"
  , W = "copycat-prompts"
  , X = async () => {
    try {
        await chrome.contextMenus.removeAll()
    } catch (e) {
        s[s.MODE].DEBUG
    }
}
  , J = async () => {
    const e = [{
        id: K,
        title: 'Pesquisar na Biblioteca de Anúncios: "%s"',
        contexts: ["selection"]
    }, {
        id: Q,
        title: "Pesquisar Site na Biblioteca de Anúncios",
        contexts: ["link"],
        targetUrlPatterns: ["*://*/*"]
    }, {
        id: W,
        title: "Análise com ChatGPT",
        contexts: ["selection"]
    }, {
        id: "keywordFromSelectionPrompt",
        parentId: W,
        title: "Sugerir palavras-chave relacionadas",
        contexts: ["selection"]
    }, {
        id: "segmentationFromSelectionPrompt",
        parentId: W,
        title: "Sugerir públicos relacionados",
        contexts: ["selection"]
    }, {
        id: "persuasionAnalysisFromSelectionPrompt",
        parentId: W,
        title: "Analisar técnicas de persuasão",
        contexts: ["selection"]
    }, {
        id: "abTestVariationsFromSelectionPrompt",
        parentId: W,
        title: "Gerar variações para teste A/B",
        contexts: ["selection"]
    }, {
        id: "offerStructureFromSelectionPrompt",
        parentId: W,
        title: "Analisar estrutura da oferta",
        contexts: ["selection"]
    }, {
        id: "customerAvatarFromSelectionPrompt",
        parentId: W,
        title: "Identificar avatar do cliente",
        contexts: ["selection"]
    }, {
        id: "creativeAnglesFromSelectionPrompt",
        parentId: W,
        title: "Gerar ângulos de criativos e hooks/ganchos",
        contexts: ["selection"]
    }, {
        id: "quizFunnelFromSelectionPrompt",
        parentId: W,
        title: "Gerar funil de quiz interativo",
        contexts: ["selection"]
    }];
    try {
        await X();
        for (const t of e)
            await chrome.contextMenus.create(t)
    } catch (e) {
        s[s.MODE].DEBUG
    }
}
;
J(),
chrome.contextMenus.onClicked.addListener((async (t, a) => {
    let o = null
      , n = null
      , i = null
      , r = null;
    if (t.menuItemId === K) {
        const e = t.selectionText;
        i = s.AD_LIB_URL + s.AD_LIB_QUERY.format({
            q: encodeURIComponent(e)
        }),
        o = "context",
        n = "contextSearchTerm",
        r = {
            searchTerm: e,
            url: i
        }
    } else if (t.menuItemId === Q)
        try {
            const e = new URL(t.linkUrl).hostname.replace("www.", "");
            i = s.AD_LIB_URL + s.AD_LIB_QUERY.format({
                q: encodeURIComponent(e)
            }),
            o = "context",
            n = "contextSiteDomain",
            r = {
                siteDomain: e,
                url: i
            }
        } catch (e) {
            return void s[s.MODE].DEBUG
        }
    else {
        if (!t.menuItemId.includes("SelectionPrompt"))
            return void s[s.MODE].DEBUG;
        {
            const e = V(t.menuItemId);
            if (o = "generate",
            n = Y(t.menuItemId),
            !e || !n)
                return void s[s.MODE].DEBUG;
            const a = t.selectionText
              , c = !0
              , d = new URL("https://chatgpt.com/");
            d.searchParams.append("q", e.format({
                selection: a
            })),
            d.searchParams.append("temporary-chat", c),
            i = d.href,
            r = {
                url: i
            }
        }
    }
    try {
        await chrome.tabs.sendMessage(a.id, {
            type: "SHOW_CONTEXT_SPINNER"
        });
        try {
            await e(o, n, r, w)
        } finally {
            try {
                await chrome.tabs.sendMessage(a.id, {
                    type: "HIDE_CONTEXT_SPINNER"
                })
            } catch (e) {
                s[s.MODE].DEBUG
            }
        }
    } catch (t) {
        s[s.MODE].DEBUG,
        await e(o, n, r, w)
    }
    chrome.tabs.create({
        url: i
    })
}
));
const $ = async () => {
    const e = await t()
      , o = await a();
    D(e, o)
}
;
$(),
chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
        id: 1,
        priority: 1,
        action: {
            type: "modifyHeaders",
            responseHeaders: [{
                header: "X-Frame-Options",
                operation: "remove"
            }]
        },
        condition: {
            urlFilter: `||${new URL(s[s.MODE].ORIGIN_URL).host}/`,
            initiatorDomains: [s.ID],
            resourceTypes: ["sub_frame"]
        }
    }, {
        id: 2,
        priority: 1,
        action: {
            type: "modifyHeaders",
            responseHeaders: [{
                header: "Content-Security-Policy",
                operation: "remove"
            }]
        },
        condition: {
            urlFilter: "||facebook.com/ads/library/",
            resourceTypes: ["main_frame"]
        }
    }],
    removeRuleIds: [1, 2]
});
const Z = async () => {
    s[s.MODE].DEBUG;
    let e = {};
    await chrome.storage.sync.get(null).then((t => {
        e = t
    }
    ));
    let t = [];
    for (const [a,o] of Object.entries(e))
        try {
            await chrome.tabs.sendMessage(parseInt(a), {
                type: "PING"
            })
        } catch (e) {
            t.push(a)
        }
    t.length > 0 && (s[s.MODE].DEBUG,
    await chrome.storage.sync.remove(t))
}
;
setInterval(Z, 15e3);
