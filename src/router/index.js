import routeConfig from '@/config/routes.js';
import VueRouter from 'vue-router';

const layoutModules = import.meta.glob('../layouts/*');
const pagesModules = import.meta.glob('../pages/**/*.vue');
const fristPagesModules = import.meta.glob('../pages/*.vue');

const modules = Object.assign({}, layoutModules, fristPagesModules, pagesModules);
const getMenuRoutes = (list) => {
  if (!list) {
    return [];
  }
  return list.map((item) => {
    const { path = '', component, meta = { title: item.title }, redirect = '' } = item;
    return {
      path,
      component: modules[component],
      children: getMenuRoutes(item.children),
      meta,
      redirect,
    };
  });
};

const routes = [
  ...getMenuRoutes(routeConfig, true),
  {
    path: '*',
    redirect: '/dashboard/base',
  },
];

const route = new VueRouter({
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 };
  },
});

export default route;
