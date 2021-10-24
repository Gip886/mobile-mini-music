import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// const TabBar = () => import('../components/tabbar/TabBar.vue')
const DiscoverPage = () => import('../views/DiscoverPage.vue')
const PlayPage = () => import('../views/PlayingPage.vue')
const LyricPage = () => import('../views/LyricPage.vue')


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    redirect: '/discover'
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/discover',
    name: 'Discover',
    component: DiscoverPage
  },
  {
    path: '/playing',
    name: 'Playing',
    component: PlayPage
  },
  {
    path: '/lyric',
    name: 'Lyric',
    component: LyricPage
  }

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  // base:  '/mini-music/',
  routes
})

export default router
