import Vue from 'vue'
import Router from 'vue-router'


// import Msite from '../pages/Msite/Msite'
// import Profile from '../pages/Profile/Profile'
// import Order from '../pages/Order/Order'
// import Search from '../pages/Search/Search'

const Msite = () => import('../pages/Msite/Msite')
const Profile = () => import('../pages/Profile/Profile')
const Order = () => import('../pages/Order/Order')
const Search = () => import('../pages/Search/Search')


import Login from '../pages/Login/Login'
import Shop from '../pages/Shop/Shop'
import ShopGoods from "../pages/Shop/ShopGoods/ShopGoods";
import ShopInfo from "../pages/Shop/ShopInfo/ShopInfo";
import ShopRatings from "../pages/Shop/ShopRatings/ShopRatings";

Vue.use(Router)

// 重复点击导航路由报错解决方法
const originalReplace = Router.prototype.replace;
Router.prototype.replace = function replace(location) {
  return originalReplace.call(this, location).catch(err => err);
};

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Msite',
      component: Msite,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/order',
      name: 'Order',
      component: Order,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        showFooter: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/shop',
      name: 'Shop',
      component: Shop,
      children: [
        {
          path: '/shop/goods',
          name: 'ShopGoods',
          component: ShopGoods,
        },
        {
          path: '/shop/info',
          name: 'ShopInfo',
          component: ShopInfo,
        },
        {
          path: '/shop/ratings',
          name: 'ShopRatings',
          component: ShopRatings,
        },
        {
          path: '',
          redirect: '/shop/goods'
        }
      ]
    }
  ]

})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

