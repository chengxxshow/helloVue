<template>
<el-container class="gao-el-container">
  <el-header class="myheader">
     <el-input placeholder="请输入员工名或编号" size="mini" v-model="keywords" style="width: 170px;"/>
     <el-button type="primary" size="mini" style="margin-left: 10px" icon="el-icon-view" @click="searchClick">查询用户</el-button>
  </el-header>
    <el-main class="cate_mana_main gao_el-main">
      <el-table stripe class='tableBox'
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column
          type="selection"
          width="55" align="left" v-if='false' >
        </el-table-column>
        <el-table-column
          label="员工编号"
          prop="empno"
          width="120" align="left">
        </el-table-column>
        
       <el-table-column
          label="员工名"
          prop="ename"
          width="120" align="left">
        </el-table-column>

        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="primary"
              size="mini"
              @click="">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 100px;" size="mini"
                 @click="" v-if="this.categories.length>0">批量删除
      </el-button>
    </el-main>

</el-container>
</template>

 <script>
  export default{
    methods: {

      searchClick(){
        this.loadBlogs(1, 100);//临时不翻页的情况
      },
      //翻页相关  
      loadBlogs(page, count){
        var _this = this;
        var url = "/emp/all?page=" + page + "&count=" + count + "&keywords=" + this.keywords;
        this. axios({url:url, method:"get"}) .then(resp=> {
         
          if (resp.status == 200) {
            _this.tableData = resp.data.list;
            _this.totalCount = resp.data.totalCount;
            _this.currentPage01 = page ;
          } else {
            _this.$message({type: 'error', message: '数据加载失败!'});
          }
        }, resp=> {
          _this.loading = false;
          if (resp.response.status == 403) {
            _this.$message({type: 'error', message: resp.response.data});
          } else {
            _this.$message({type: 'error', message: '数据加载失败!'});
          }
        }).catch(resp=> {
          //压根没见到服务器
          _this.loading = false;
          _this.$message({type: 'error', message: '数据加载失败!'});
        })

        //_this.loading = false;
      },
      
      handleSelectionChange(val) {
        this.selItems = val;
      },

      refresh(){
        let _this = this;
        //01=/ucsys  02=/neusys
         this. axios({url:'/emp/all?page=1&count=100', method:"get"}) .then((resp)=>{    
          _this.tableData = resp.data.list;
          _this.loading = false;
        }, resp=> {
          if (resp.response.status == 403) {
            _this.$message({
              type: 'error',
              message: resp.response.data
            });
          }
          _this.loading = false;
        });

       }
    },
    mounted: function () {
      this.loading = true;
      this.refresh();
    },
     filters:{
      
    },
    data(){
      return {
        keywords: '',
        selItems: [],
        categories: [],

        
        tableData: [],
        loading: false,
        
      }
    }
  }
 </script>

<style>
  .gao-cate_mana_header {
    background-color: #ececec;
    margin-top: 20px;
    padding-left: 5px;
    display: flex;
    justify-content: flex-start;
    text-align: center;
    vertical-align: middle;
  }

  .gao-cate_mana_main {
    /*justify-content: flex-start;*/
    display: flex;
    flex-direction: column;
    padding-left: 5px;
    background-color: #ececec;
    margin-top: 20px;
    padding-top: 10px;
  }

  .gao-transfer-footer {
    margin-left: 20px;
    padding: 6px 5px;
  }

  .gao-el-header {
    background-color: #20a0ff;
    color: #333;
    text-align: left;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .gao-el-aside {
    background-color: #ECECEC;
  }

  .gao-el-main {
    background-color: #fff;
    color: #000;
    text-align: left;
  }

  .gao-el-container {
    background-color: #fff;
    color: #000;
    text-align: left;
  }
  .myheader{
    text-align: left;
    background: white;
  }
 
.el-table__header tr,.el-table__header th{
    padding: 0!important;
    height: 50px;
    line-height: 50px;
}
</style>