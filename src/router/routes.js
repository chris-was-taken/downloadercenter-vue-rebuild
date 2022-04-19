/*
import { i18n } from "../assets/languageKeys/i18n"
import DownloadCenter from '@/components/Downloadcenter'

export default {
  path: '/:lang',
  component: {
    template: '<router-view></router-view>'
  },
  beforeEnter (to, from, next) {
    const lang = to.params.lang
    if (!["en","de"].includes(lang)) return next("en")

    if(i18n.locale !== lang) {
      i18n.locale = lang
    }
    return next()
  },
  children: [{
    path: "",
    name: "Downloadcenter",
    component: DownloadCenter
  }]
}
*/
