import { createRouter, createWebHistory } from 'vue-router'
import SearchVista from '../views/SearchVista.vue'
import SerieDetail from '../views/SerieDetailed.vue'
import PopularesVista from '../views/PopularesVista.vue'
import MejorVotadasVista from '../views/MejorVotadasVista.vue'
import ContactoVista from '../views/ContactoVista.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: SearchVista
  },

  {
    path: '/serie/:id',
    name: 'Serie detallada',
    component: SerieDetail
  },

  {
    path: '/populares',
    name: 'Series populares',
    component: PopularesVista
  },

  {
    path: '/mejorvotadas',
    name: 'Series mejor votadas',
    component: MejorVotadasVista
  },

  {
    path: '/contacto',
    name: 'Contacto',
    component: ContactoVista
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
