const supportedLang = [
    "AR",
    "BN",
    "EN",
    "ES",
    "FR",
    "HI",
    "ID",
    "PT",
    "RU",
    "ZH"
]
const prefix = "https://www.lotto-btc.com"
const defaultLang = "en"
const userLang = navigator.language || navigator.userLanguage;
const lang = userLang.split("-")[0].toUpperCase()

supportedLang.includes(lang) 
    ? window.location.assign(`${prefix}/${lang.toLowerCase()}`)

    : window.location.assign(`${prefix}/en`)

