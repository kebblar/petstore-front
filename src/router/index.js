import Vue from 'vue'
import Router from 'vue-router'

import OnlyModal from '@/components/OnlyModal'
import UsaModal from '@/components/UsaModal'
import GooseModal from'@/components/GooseModal'

Vue.use(Router);

const routes = [
  {
    path: '/goose',
    name: 'goose',
    component: GooseModal
  },
  {
    path: '/ui/onlyModal',
    name: 'onlyModal',
    component: OnlyModal
  },
  {
    path: '/ui/usaModal',
    name: 'usaModal',
    component: UsaModal
  }
]

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
})

export default router;
