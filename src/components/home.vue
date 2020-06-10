<template>
    <div id="product-list-one">
        <h2>welcome,  {{username}}</h2>
        
    </div>
</template>

<script>
export default {
  name: 'Home',

  data () {  
    return {
       username:'',
   
    }
  },
 methods: {
   
  },
 mounted: function () {
      this.username=sessionStorage.getItem("name")
    }
}
</script>
<style scoped>

</style>
