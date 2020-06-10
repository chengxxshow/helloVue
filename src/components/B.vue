<template>
    <div id="product-list-one">
        <h2>user List Two</h2>
        <ul>
            <li v-for="user in users" :key="user.name">
                <span class="name">{{ user.name }}</span>
                <span class="age">{{ user.age }}</span>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  name: 'B',

  data () {  
    return {
       users : this.$store.getters.youngsUsers//获取store中gettes的数据
    }
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
