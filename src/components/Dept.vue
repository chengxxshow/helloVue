<template>
<el-container class="gao-el-container">
  <el-header class="myheader">
     <el-input placeholder="请输入部门名或编号" size="mini" v-model="keywords" style="width: 170px;"/>
     <el-button type="primary" size="mini" style="margin-left: 10px" icon="el-icon-view" @click="searchClick">查询部门</el-button>
     <el-button type="success" size="mini" style="margin-left: 10px" icon="el-icon-edit" @click="newDept()">新增部门</el-button>
  </el-header>
    <el-main class="cate_mana_main gao_el-main">
      <el-table stripe class='tableBox'
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" v-loading="loading">
       
        <el-table-column
          type="selection"
          width="55" align="left">
        </el-table-column>
        </el-table-column>
        <el-table-column
          label="部门编号"
          prop="deptno"
          width="100" align="left">
        </el-table-column>
        
       <el-table-column
          label="部门名"
          prop="deptname"
          width="120" align="left">
        </el-table-column>

       <el-table-column
          label="地址"
          prop="loc"
          width="120" align="left">
        </el-table-column>
        

        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <el-button type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-footer>
          <el-row :gutter="2" >
            <el-col :span="6">
            <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 100px;" size="mini"
                 @click="deleteAll" v-if="this.tableData.length>0">批量删除
            </el-button>
            </el-col>
            <el-col :span="5">
            <el-pagination
              background
              :page-size="pageSize" :current-page.sync="currentPage01"
              layout="total, prev, pager, next"
              :total="totalCount" @current-change="currentChange" v-show="this.tableData.length>0">
            </el-pagination>
            </el-col>
          </el-row>
      </el-footer>

      
    </el-main>

<!-- 新建部门弹框---start -->
        <el-dialog title="新建部门" :visible.sync="dialogFormVisible" width="600px" align="center">
            <el-form  ref="formAdd" :rules="rules"  :inline="true" :model="formAdd" class="demo-form-inline" size="mini">
                
               <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">部门编号:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="deptno">
                          <el-input v-model="formAdd.deptno" placeholder="部门编号" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">部门名:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         <el-form-item label="" prop="deptname">
                            <el-input v-model="formAdd.deptname" placeholder="部门名" size="mini"></el-input>
                        </el-form-item>
                    </div>
                    </el-col>
                </el-row>
             <el-row :gutter="2">
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">部门地址:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="18">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="loc">
                          <el-input v-model="formAdd.loc" placeholder="部门地址" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>
                  
                </el-row>
                <br/>
                  <el-form-item>
                    <el-button type="warning" @click="dialogFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="addNewDept('formAdd')" size="mini">保 存</el-button>
                  </el-form-item>
            </el-form>
            
            <br>
           
      </el-dialog>
<!-- 新建部门弹框---end -->
<!-- 修改部门弹框---start -->
        <el-dialog title="修改部门信息" :visible.sync="dialogFormVisible2" width="600px" align="center">
            <el-form  ref="formAdd" :rules="rules"  :inline="true" :model="formAdd" class="demo-form-inline demo-ruleForm" size="mini">

                       <el-form-item label="部门编号" prop="deptno">
                          <el-input v-model="formAdd.deptno" placeholder="部门编号" readonly="readonly" size="mini"></el-input>
                       </el-form-item>

                         <el-form-item label="部门名" prop="deptname">
                            <el-input v-model="formAdd.deptname" placeholder="部门名" size="mini"></el-input>
                        </el-form-item>

                       <el-form-item label="部门地址" prop="loc">
                          <el-input style="width:420px" v-model="formAdd.loc" placeholder="部门地址" size="mini"></el-input>
                       </el-form-item>
               
                <br/>
                  <el-form-item>
                    <el-input type="hidden"  v-model="formAdd.id"  />
                    <el-button type="warning" @click="dialogFormVisible2 = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="updateDept('formAdd')" size="mini">保 存</el-button>
                  </el-form-item>
            </el-form>
            
            <br>
           
      </el-dialog>
<!-- 修改部门弹框---end -->
</el-container>
</template>

 <script>
  export default{
    methods: {

      searchClick(){
      // this.loadBlogs(1, 100);//临时不翻页
        this.loadBlogs(1, this.pageSize);
      },
      //翻页相关
      currentChange(currentPage){
        this.currentPage01 = currentPage;
        this.loading = true;
        this.loadBlogs(currentPage, this.pageSize);
      },
      //翻页相关  
      loadBlogs(page, count){
        var _this = this;
        var url = "/dept/all?page=" + page + "&count=" + count + "&keywords=" + this.keywords;
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

        _this.loading = false;
      },
      
      handleSelectionChange(val) {
        this.selItems = val;
      },

      refresh(){
        let _this = this;
        
        _this.searchClick(); 

        //页面加载查询所有部门
         this. axios({url:'/dept/all', method:"get"}) .then((resp)=>{    
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
      //页面加载查询所有部门
        this. axios({url:'/dept/all', method:"get"}) .then((resp)=>{    
          _this.deptList = resp.data.list;
         
        });


       },
    //打开新增部门模态框
    newDept(){
        let _this = this;
        _this.dialogFormVisible = true;
        _this.formAdd.deptno='',
        _this.formAdd.deptname='',
        _this.formAdd.loc=''
      },
    //保存部门信息
    addNewDept(formName){
      this.$refs[formName].validate(valid => {
         if (valid) {
           
            this.axios({url:'/dept/add', method:"post",data:this.formAdd}) .then((resp)=>{
              if (resp.status == 200) {
                  this.dialogFormVisible=false;
                  this.$message({type:'success', message: resp.data});
                  this.refresh();
              }
            },resp=> {
            if (resp.response.status == 403) {
              this.$message({
                type: 'error',
                message: resp.response.data
              });
            }
            this.loading = false;
          }) 
         }
      })
    },
   //打开编辑部门模态框,并初始化值
    handleEdit(index, row){
        var _this = this;
        _this.dialogFormVisible2 = true;
        console.log("row"+row.id);
        _this.formAdd.deptno=row.deptno;
        _this.formAdd.deptname=row.deptname;
        _this.formAdd.loc=row.loc;
        _this.formAdd.id=row.id;

      },
    //保存修改部门信息
    updateDept(formName){
       this.$refs[formName].validate(valid => {
         if (valid) {
           console.log(this.formAdd)
            this.axios({url:'/dept/updateById', method:"post",data:this.formAdd}) .then((resp)=>{
              if (resp.status == 200) {
                  this.dialogFormVisible2=false;
                  this.$message({type:'success', message: resp.data});
                  this.refresh();
              }
            },resp=> {
            if (resp.response.status == 403) {
              this.$message({
                type: 'error',
                message: resp.response.data
              });
            }
            this.loading = false;
          }) 
         }
      })
    },
    //删除选中记录
    handleDelete(index, row){
        let _this = this;
        this.$confirm('确认删除 "' + row.deptname + '" ?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          _this.deleteCate(row.id);
        }).catch(() => {
          //取消
          _this.loading = false;
        });
      },
      //删除一条或多条信息
       deleteCate(ids){
        var _this = this;
        this.loading = true;
        this.axios.delete('/dept/delById?ids='+ids) .then((resp)=>{
            this.$message({type:'success', message: resp.data});
          _this.refresh();
        }, resp=> {
          _this.loading = false;
          if (resp.response.status == 403) {
            _this.$message({
              type: 'error',
              message: resp.response.data
            });
          } else if (resp.response.status == 500) {
            _this.$message({
              type: 'error',
              message: '删除失败!'
            });
          }
        })
      },
      //批量删除
      deleteAll(){
        var _this = this;
        this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
          type: 'warning',
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(()=> {
          var selItems = _this.selItems;
          var ids = '';
          for (var i = 0; i < selItems.length; i++) {
            ids += selItems[i].id + ",";
          }
          _this.deleteCate(ids.substring(0, ids.length - 1));
        }).catch(() => {
          //取消
          _this.loading = false;
        });
      },
    },
   

    mounted: function () {
      this.loading = true;
      this.refresh();
    },
    
    data(){
      return {
      
        totalCount: 0,
        currentPage01:1,
        pageSize: 10,
       

        keywords: '',
        selItems: [],
        categories: [],

        
        tableData: [],
        loading: false,

        dialogFormVisible: false,
        dialogFormVisible2: false,
        rowId:'',
       
   
       formAdd:{
          deptno:'',
          deptname:'',
          loc:'',
       } ,

      deptList:[],


      pickerOptions: {
          disabledDate(v) {
              return v.getTime()> new Date().getTime() ;
           }
      },
      rules: {
          deptno: [
            {required: true, message: "部门编号不能为空", trigger: 'blur'},
            {min: 4, max: 64, message: "部门编号2-64位数字字母",pattern: /^[a-zA-Z0-9]{2,64}$/, trigger: 'blur'}
          ],
          deptname: [
            {required: true, message: "部门姓名不能为空", trigger: 'blur'},
            {min: 2, max: 50, message: "姓名2-50位中英文数字", pattern: /^[\u4E00-\u9FA5a-zA-Z0-9]{2,50}$/,trigger: 'blur'}
          ]
      },
        
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