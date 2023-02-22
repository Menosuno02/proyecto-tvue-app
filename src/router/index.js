import { createRouter, createWebHistory } from 'vue-router'
import SearchVista from '../views/SearchVista.vue'
import SerieDetailed from '../views/SerieDetailed.vue'
import ContactoVista from '../views/ContactoVista.vue'
import ListaEspecialVista from '../views/ListaEspecialVista.vue'

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: SearchVista
  },

  {
    path: '/serie/:id',
    name: 'Serie detallada',
    component: SerieDetailed
  },

  {
    path: '/especial/:tipo',
    name: 'Listas especiales',
    component: ListaEspecialVista,
    props: true
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