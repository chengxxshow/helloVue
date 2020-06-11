<template>
    <div id="product-list-one">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
            welcome,  {{username}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personnal center ">personnal center </el-dropdown-item>
              <el-dropdown-item command="logout">log out</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
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
        handleCommand(command) {
           //this.$message('click on item ' + command);
           if (command == 'logout') {
              // var this_=this   //
                this.$confirm('注销登录吗?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then( ()=>{
                    //1.access back end，remove sessoin
                    //2.remove sessionStorage 
                    //3.page replaced by login
                    console.log(this)
                    this. axios({url:'/user/loginOut', method:"get"}) .then((res)=>{    
                   });
                    sessionStorage.removeItem("Flag");
                    sessionStorage.removeItem("name");
                    sessionStorage.removeItem("useID");
                    this.$router.replace({path: '/'});
                });
          }
        },
    },
  mounted: function () {
        this.username=sessionStorage.getItem("name")
      }
  }
</script>

<style>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
</style>
<style scoped>

</style>
