String.prototype.format = function(t) {
    var e = this;
    for (var s in t) {
        var o = new RegExp("{" + s + "}","gm");
        e = e.replace(o, t[s])
    }
    return e
}
;
export const CopycatAdsConfig = {
    MODE: "PROD_MODE",
    ID: chrome.runtime.id,
    VERSION: chrome.runtime.getManifest().version,
    POPUP_URL: chrome.runtime.getURL("src/popup/popup.html"),
    BRAND_LOGO_REGULAR_URL: chrome.runtime.getURL("assets/logo/logo.svg"),
    BRAND_LOGO_SEARCHING_URL: chrome.runtime.getURL("assets/logo/logo-searching.png"),
    BRAND_TITLE_REGULAR_URL: chrome.runtime.getURL("assets/logo/light-title.svg"),
    REGEX_URL: /^https:\/\/.*\.facebook\.com$/,
    IS_POPUP_VISIBLE: !0,
    DEFAULT_DELAY_MS: 10,
    MAX_RELOAD_ATTEMPTS: 5,
    MAX_UPDATE_ATTEMPTS: 15,
    RETRY_RATE_MS: 3e3,
    MAX_LOADING_TIME_MS: 1e4,
    SERVER_STATUS_CACHE_MS: 1e4,
    REFRESH_RETRY_DELAY_MS: 100,
    SESSION_EXPIRATION_MIN: 30,
    AD_LIB_URL: "https://www.facebook.com/ads/library/",
    AD_LIB_QUERY: "?active_status=active&ad_type=all&country=ALL&q={q}&search_type=keyword_unordered&media_type=all",
    IG_URL: "https://www.instagram.com/copycat.apps",
    YT_URL: "https://www.youtube.com/@copycat-apps",
    TT_URL: "https://www.tiktok.com/@copycat.apps",
    OFFLINE_SUPPORT_URL: "https://wa.me/5531998002089?text=Ol%C3%A1%2C+Copycat%21+Estou+com+um+problema+no+Copycat+Ads.",
    NOTIFICATION_AUDIO: chrome.runtime.getURL("assets/audio/notification.mp3"),
    PROD_MODE: {
        DEBUG: !1,
        ORIGIN_URL: "https://copycat.intellabs.com.br",
        SIGNIN_URL: "https://copycat.intellabs.com.br/sign-in",
        SIGNUP_URL: "https://copycat.intellabs.com.br/sign-up",
        PROFILE_URL: "https://copycat.intellabs.com.br/profile",
        APPS_URL: "https://copycat.intellabs.com.br/apps",
        SUBSCRIBE_URL: "https://copycat.intellabs.com.br/plans?app=copycat-ads",
        API_BASE_URL: "https://copycat.intellabs.com.br/ads-service/ads/",
        API_AUTH_URL: "https://copycat.intellabs.com.br/ads-service/ads/auth",
        API_CONFIG_URL: "https://copycat.intellabs.com.br/ads-service/ads/config?type=x-path%7Curl",
        API_ENGAGEMENT_URL: "https://copycat.intellabs.com.br/ads-service/ads/engagement",
        API_UNINSTALL_URL: "https://copycat.intellabs.com.br/ads-service/ads/uninstall?clientId={clientId}&sessionId={sessionId}&extensionVersion={extensionVersion}",
        API_SUPPORT_URL: "https://copycat.intellabs.com.br/ads-service/ads/support?clientId={clientId}&sessionId={sessionId}&event={event}&extensionVersion={extensionVersion}",
        API_REDIRECT_URL: "https://copycat.intellabs.com.br/ads-service/ads/redirect?clientId={clientId}&sessionId={sessionId}&event={event}&extensionVersion={extensionVersion}"
    }
};
