import Vue from 'vue'
import Router from 'vue-router'

import Pagamento from '@/views/Pagamento/router';
import Inicio from '@/views/Inicio/router';
import NotFound from '@/views/404';

Vue.use(Router);


const baseRoutes = [{
    path: '/404',
    name: '404',
    component: NotFound,
}];

const routes = baseRoutes.concat(Inicio, Pagamento);


export const router = new Router({
    mode: 'history',
    base: '/solident/cliente/',
    routes
});