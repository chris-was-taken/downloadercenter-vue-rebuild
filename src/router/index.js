import Vue from 'vue'
import Router from 'vue-router'
import DownloadCenter from '@/components/Downloadcenter'
//import routes from './routes'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Downloadcenter',
      component: DownloadCenter
    }
  ]
})
/*export default new Router({
  routes: routes,
  mode: "history"
})*/
