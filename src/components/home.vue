<template>
 <div id="product-list-one">
    <el-container>
      <el-header class="my-el-header">
        <div class="home_title" >XXX企业人事管理系统</div>
        <div class="home_userinfoContainer" >
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
      </el-header>

      <el-container>
        <el-aside width="300px">
           <el-menu :default-openeds="['']">
 
              <el-menu-item index="1"><i class="el-icon-user-solid"></i>员工管理</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-message"></i>考勤管理</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-star-on"></i>奖罚管理</el-menu-item>

              <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item-group title=" ">
                  <el-menu-item index="1-1">用户权限管理</el-menu-item>
                  <el-menu-item index="1-2">菜单管理</el-menu-item>
                </el-menu-item-group>

              </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>

      <el-footer>Footer</el-footer>
    </el-container>

   
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
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
   .my-el-header {
    background-color:#ccc;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .home_title{
    color: #fff;
    font-size: 22px;
    display: inline;
  }
  .home_userinfoContainer{
     display: inline;
    margin-right: 20px;
    text-align: right;
  }

</style>
<style scoped>

</style>
