import Vue from 'vue'
import Router from 'vue-router'


import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import home from '@/components/home'
import Emp from '@/components/Emp'
import Dept from '@/components/Dept'
import A from '@/components/A'
import B from '@/components/B'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'HelloWorld',
      hidden: true,
      component: HelloWorld
    },
    {
      path: '/',
      name: 'login',
      hidden: true,
      component: login,
      meta: {
        isLogin: false
      }
    },

    {
      path: '/home',
      name: 'home',
      hidden: true,
      component: home,
      meta: {
        isLogin: true
      }
    },
    {
      path: '/home',
      name: '员工管理',
      component: home,
      iconCls: 'fa fa-address-card',
      leaf: true,//只有一个节点
      children: [
        {
          path: '/Emp',
          name: '员工管理',
          component: Emp,
          iconCls: 'el-icon-user-solid',
          meta: {
            keepAlive: false,
            isLogin: true
          }
        }
      ]
    },
    {
      path: '/home',
      name: '系统管理',
      component: home,
      iconCls: 'el-icon-setting',
      leaf: false,
      children: [
        {
          path: '/Dept',
          name: '部门管理',
          component: Dept,
          iconCls: 'el-icon-star-on',
          meta: {
            keepAlive: false,
            isLogin: true
          }
        },
        {
          path: '/A',
          name: '测试1',
          component: A,
          iconCls: 'el-icon-s-goods',
          meta: {
            keepAlive: false,
            isLogin: true
          }
        },
        {
          path: '/B',
          name: '测试2',
          component: B,
          meta: {
            keepAlive: false,
            isLogin: true
          }
        },
      ]
    },

  ]
})
