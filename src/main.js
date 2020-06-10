// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from'element-ui'
import'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI);

import axios from'axios'
import VueAxios from'vue-axios' 
Vue.use(VueAxios, axios) 
axios.defaults.baseURL="http://localhost:8090/"
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

Vue.config.productionTip = false


import Vuex  from 'vuex'
Vue.use(Vuex)

// const store = new Vuex.Store({
//   state:{ 
//     users:[{name:"Tom",age:32},{name:"Lucy",age:18},{name:"HanMeiMei",age:34}],
//     isLogin: false,
//   },

//   getters:{ //添加getters
//      youngsUsers: (state) => {
//       let youngsUsers = state.users.map( user => {
//         return {
//           name: user.name,
//           age: user.age / 2
//         }
//       })
//       return youngsUsers;
//     }
//   } ,

//   mutations:{ //添加mutations
//     minusAge (state, payload ) {
//       let newAge = state.users.forEach( user => {
//         user.age -= payload
//       })
//     }
//   },
  
//   actions:{ //添加actions
//     minusAgeAsync( context, payload ) {
//         context.commit( 'minusAge', payload ); //context提交
//       }
//     }
  

// })
const store = new Vuex.Store({
  // 设置属性
  state: {
    User:{},
    isLogin: false,
  },

  // 获取属性的状态
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
  },

  // 应用mutations
  actions: {
    //获取登录状态
    setUser({commit}, flag) {
      commit("userStatus", flag)
    },
  }
})


////////////////----------------------------------------------------

router.beforeEach((to, from, next) => {

  //获取用户登录成功后储存的登录标志
  //let getFlag = localStorage.getItem("Flag");

  let getFlag =  sessionStorage.getItem("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){

    //设置vuex登录状态为已登录
    store.state.isLogin = true
    next()

    //如果已登录，还想想进入登录注册界面，则定向回首页
    if (!to.meta.isLogin) {
      //iViewUi友好提示
      // iView.Message.error('请先退出登录')
      next({
        path: '/home'
      })
    }

    //如果登录标志不存在，即未登录
  }else{

    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.isLogin){
      next({
        path: '/login',
      })
      //iViewUi友好提示
      // iView.Message.info('请先登录')
      //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }

  }

});

router.afterEach(route => {
  window.scroll(0, 0);
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
