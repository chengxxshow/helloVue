<template>
    <div id="product-list-one">
        <h2>welcome,  {{username}}</h2>
        <ul>
            <li v-for="user in users" :key="user.name">
                <span class="name">{{ user.name }}</span>
                <span class="age">{{ user.age }}</span>
            </li>
        </ul>
          <button @click="minusAge">减少年龄</button>
          <button @click="minusAgeAsync">异步减少年龄</button> 
    </div>
</template>

<script>
export default {
  name: 'A',

  data () {  
    return {
       username:'',
       users : this.$store.state.users //获取store中state的数据
       
    }
  },
 methods: {
     minusAge() {
            this.$store.commit('minusAge', 2); //提交
      },
    
    minusAgeAsync() {
            this.$store.dispatch('minusAgeAsync', 5); //分发actions中的minusAgeAsync这个异步函数
        },
   
},
 mounted: function () {
      this.username=sessionStorage.getItem("name")
    }
}
</script>
<style scoped>
#product-list-one{
    background: #FFF8B1;
    box-shadow: 1px 2px 3px rgba(0,0,0,0.2);
    margin-bottom: 30px;
    padding: 10px 20px;
}
#product-list-one ul{
    padding: 0;
}
#product-list-one li{
    display: inline-block;
    margin-right: 10px;
    margin-top: 10px;
    padding: 20px;
    background: rgba(255,255,255,0.7);
}
.age{
    font-weight: bold;
    color: #E8800C;
}
</style>
