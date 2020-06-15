<template>
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
           <el-menu class="el-menu-vertical-demo"  default-active="0" router  @select="addTab" >
<!--  
              <el-menu-item index="1"><i class="el-icon-user-solid"></i>员工管理</el-menu-item>
              <el-menu-item index="2"><i class="el-icon-message"></i>考勤管理</el-menu-item>
              <el-menu-item index="3"><i class="el-icon-star-on"></i>奖罚管理</el-menu-item>

              <el-submenu index="4">
                <template slot="title"><i class="el-icon-setting"></i>系统管理</template>
                <el-menu-item-group title=" ">
                   <el-menu-item index="1-1">部门管理</el-menu-item>
                  <el-menu-item index="1-2">用户权限管理</el-menu-item>
                  <el-menu-item index="1-3">菜单管理</el-menu-item>
                </el-menu-item-group>

              </el-submenu> -->
               <template v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
                      <!--二级菜单-->
                      <template v-if="!item.leaf" >
                          <el-submenu :index="index+''">
                            <template slot="title">
                              <i :class="item.iconCls"></i>
                              <span>{{item.name}}</span>
                            </template>
                            <el-menu-item-group>
                              <el-menu-item :index="child.path" :key="index" v-for="(child, index) in item.children">
                                {{child.name}}
                              </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                      </template>

                      <!--一级菜单-->
                      <template v-else>
                          <el-menu-item :index="child.path" :key="child.path" v-for="(child, index) in item.children">
                            <i :class="child.iconCls"></i>
                            <span slot="title">{{child.name}}</span>
                          </el-menu-item>
                      </template>
                      <!-- <subMenu v-else :data="item" :key="key"></subMenu> -->
                  </template>

          </el-menu>
        </el-aside>

      <el-container>
          <div class="gao-el-main">
                <el-tabs v-model="editableTabsValue" type="border-card" closable  @edit="handleTabsEdit" @tab-click="showContent">
                  <el-tab-pane
                    :key="item.name"
                    v-for="(item, index) in editableTabs"
                    :label="item.title"
                    :name="item.name"
                    :route="item.route"
                  >
                    <router-view />
                  </el-tab-pane>
                </el-tabs>
          </div>
        </el-container>
    </el-container>

      <el-footer class="myfooter">Footer</el-footer>
</el-container>

     
</template>


<script>
  export default {
    name: 'Home',

    data () {  
      return {
        username:'',
        editableTabsValue: '2',
        editableTabs: [],
        tabIndex: 2,
    
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
          findCompontByPath(path) {
        for (let r of this.$router.options.routes) {
          if (r.children) {
            let a = r.children.find(c => c.path == path);
            if (a) {
              return a;
            }
          }
        }
        return null;
      },
      addTab(index) {
        if (index) {
          let componet = this.findCompontByPath(index);
          // console.log(componet);
          if (componet) {
            if (!this.editableTabs.some(t => t.name == componet.path)) {
              this.editableTabs.push({
                title: componet.name,
                name: componet.path,
                route: componet.path
              });
            }
            this.editableTabsValue = componet.path;
            this.$router.push(componet.path);
          }
        }
      },
      handleTabsEdit(targetName, action) {
        if (action === 'remove') {
          let tabs = this.editableTabs;
          let activeName = this.editableTabsValue;
          if (activeName === targetName) {
            tabs.forEach((tab, index) => {
              // console.log(tab.name, targetName, tab.name === targetName);
              if (tab.name === targetName) {
                let nextTab = tabs[index + 1] || tabs[index - 1];
                if (nextTab) {
                  activeName = nextTab.name;
                }
              }
            });
          }
          this.editableTabsValue = activeName;
          this.editableTabs = tabs.filter(tab => tab.name !== targetName);
          this.$router.push(activeName);
        }
      },
    showContent(tag) {
        this.$router.push(tag.name);
      },
    },
  mounted: function () {
        this.username=sessionStorage.getItem("name");


      },


  }
</script>

<style>
html,body{width: 100%;height: 100%; margin: 0;}
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
  .gao-el-main {
    background-color: #fff;
    color: #000;
    text-align: left;
    width: 100%;
    height:100%;
  }
  .myfooter{
    width: 100%;
    position: fixed;
    bottom: 0;
  }

</style>

