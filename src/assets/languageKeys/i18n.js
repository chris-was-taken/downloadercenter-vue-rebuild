import Vue from "vue"
import VueI18n from "vue-i18n"

import languageKeys from "./languageKeys"

Vue.use(VueI18n)

if(localStorage.getItem("i18n") == null) {
  localStorage.setItem("i18n", navigator.language.split("-")[0] || navigator.userLanguage.split("-")[0])
}

export const i18n = new VueI18n({
  locale: localStorage.getItem("i18n"),
  fallbackLocale: 'en',
  messages: languageKeys
})
