import Vue from 'vue'
import VueRouter from 'vue-router'

// Views
import Home from '../views/Home.vue'
import Create from '../views/Create.vue'
import Update from '../views/Update.vue'

import { folderName, server } from '../../build.config.json'
const baseURL = process.env.NODE_ENV === 'production'
    ? `${server.folderPath}${folderName}/`
    : process.env.BASE_URL

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/update/:id',
        name: 'Update',
        component: Update
    },
    {
        path: '*',
        redirect: { name: "Home" }
    }
]

const router = new VueRouter({
    routes,
    base: baseURL,
    mode: 'history',
})

export default router