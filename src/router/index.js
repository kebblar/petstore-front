import Vue from 'vue'
import Router from 'vue-router'

import Upload from '@/components/Upload'
import Upload2 from '@/components/Up2'
import Upload3 from '@/components/Up3'
import Perfil from '@/components/Perfil'
import GooseModal from'@/components/GooseModal'

Vue.use(Router);

const routes = [
  {
    path: '/goose',
    name: 'goose',
    component: GooseModal
  },
  {
    path: '/ui/perfil',
    name: 'perfil',
    component: Perfil
  },
  {
    path: '/ui/upload',
    name: 'upload',
    component: Upload
  },
  {
    path: '/ui/up2',
    name: 'upload2',
    component: Upload2
  },
  {
    path: '/ui/up3',
    name: 'upload3',
    component: Upload3
  }
]

const router = new Router({
    mode: 'history',
    scrollBehavior: () => ({ y: 0 }),
    routes
})

export default router;
