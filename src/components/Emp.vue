<template>
<el-container class="gao-el-container">
  <el-header class="myheader">
     <el-input placeholder="请输入员工名或编号" size="mini" v-model="keywords" style="width: 170px;"/>
     <el-button type="primary" size="mini" style="margin-left: 10px" icon="el-icon-view" @click="searchClick">查询员工</el-button>
     <el-button type="success" size="mini" style="margin-left: 10px" icon="el-icon-edit" @click="newEmp()">新增员工</el-button>
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
          label="员工编号"
          prop="empno"
          width="100" align="left">
        </el-table-column>
        
       <el-table-column
          label="员工名"
          prop="ename"
          width="120" align="left">
        </el-table-column>

         <el-table-column
          label="性别"
          prop="gender"
          width="100" align="left" :formatter="showGender">
        </el-table-column>

        <el-table-column
          label="部门"
          prop="deptname"
          width="120" align="left">
        </el-table-column>

         <el-table-column
          label="职位"
          prop="job"
          width="120" align="left">
        </el-table-column>

        <el-table-column
          label="入职日期"
          prop="hiredate"
          width="120" align="left">
        </el-table-column>

        <el-table-column
          label="状态"
          prop="status"
          width="120" align="left" :formatter="showStatus" >
          
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

<!-- 新建员工弹框---start -->
        <el-dialog title="新建员工" :visible.sync="dialogFormVisible" width="600px" align="center">
            <el-form  ref="formAdd" :rules="rules"  :inline="true" :model="formAdd" class="demo-form-inline" size="mini">
                
               <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">员工编号:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="empno">
                          <el-input v-model="formAdd.empno" placeholder="员工编号" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">员工名:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         <el-form-item label="" prop="ename">
                            <el-input v-model="formAdd.ename" placeholder="员工名" size="mini"></el-input>
                        </el-form-item>
                    </div>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">性别:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label=""  prop="gender">
                           <el-radio v-model="formAdd.gender" label="1">男</el-radio>
                           <el-radio v-model="formAdd.gender" label="0">女</el-radio>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                     
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">出生日期:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                          <el-form-item label="" prop="birthday">
                              <el-date-picker   type="date" placeholder="选择日期" size="mini" style="width: 130px;" 
                                  v-model="formAdd.birthday" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
                              </el-date-picker>
                            </el-form-item>
                      </div>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">学历:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="eduback">
                            <el-select  placeholder="学历" 
                               size="mini" v-model="formAdd.eduback">
                              
                               <el-option label="本科" value="1"></el-option>
                               <el-option label="硕士" value="2"></el-option>
                               <el-option label="博士" value="3"></el-option
                               <el-option label="其它" value="4"></el-option>
                              </el-select>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">入职时间:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                           <el-form-item label="" prop="hiredate" >
                              <el-date-picker  type="date" placeholder="选择日期" size="mini" style="width: 130px;" 
                              v-model="formAdd.hiredate" value-format="yyyy-MM-dd">
                              </el-date-picker>
                            </el-form-item>
                      </div>
                    </el-col>
                </el-row>
              <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">所在部门:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                          <el-form-item label="" prop='deptno'>
                                <el-select  placeholder="所在部门" 
                                size="mini" v-model="formAdd.deptno">
                                    <el-option
                                        v-for="item in deptList"
                                        :key="item.deptno"
                                        :label="item.deptname"
                                        :value="item.deptno">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                      </div>
                    </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">职位名称:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="job">
                           <el-input v-model="formAdd.job" placeholder="职位名称" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>
                </el-row>
                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">入职状态:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                          <el-form-item label="" prop="status">
                              <el-select  placeholder="入职状态" size="mini" v-model="formAdd.status">
                                
                                <el-option label="在职" value="1"></el-option>
                                <el-option label="停职" value="2"></el-option>
                                <el-option label="离职" value="0"></el-option>
                                
                              </el-select>
                            </el-form-item>
                      </div>
                    </el-col>
                        <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">备注:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="notes">
                           <el-input type="textarea" v-model="formAdd.notes"  :rows="2" placeholder="其他信息" >
                          </el-input>
                       </el-form-item>
                    </div>
                    </el-col>
                </el-row>
                <br/>
                  <el-form-item>
                    <el-button type="warning" @click="dialogFormVisible = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="addNewEmp('formAdd')" size="mini">保 存</el-button>
                  </el-form-item>
            </el-form>
            
            <br>
           
      </el-dialog>
<!-- 新建员工弹框---end -->
<!-- 修改员工弹框---start -->
        <el-dialog title="修改员工信息" :visible.sync="dialogFormVisible2" width="600px" align="center">
            <el-form  ref="formAdd" :rules="rules"  :inline="true" :model="formAdd" class="demo-form-inline" size="mini">
                
               <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">员工编号:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="empno">
                          <el-input v-model="formAdd.empno" readonly="readonly" placeholder="员工编号" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">员工名:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         <el-form-item label="" prop="ename">
                            <el-input v-model="formAdd.ename" placeholder="员工名" size="mini"></el-input>
                        </el-form-item>
                    </div>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">性别:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label=""  prop="gender">
                           <el-radio v-model="formAdd.gender" :label="1" >男</el-radio>
                           <el-radio v-model="formAdd.gender" :label="0">女</el-radio>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                     
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">出生日期:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                          <el-form-item label="" prop="birthday">
                              <el-date-picker   type="date" placeholder="选择日期" size="mini" style="width: 130px;" 
                                  v-model="formAdd.birthday" value-format="yyyy-MM-dd" :picker-options="pickerOptions">
                              </el-date-picker>
                            </el-form-item>
                      </div>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">学历:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="eduback">
                            <el-select  placeholder="学历" 
                               size="mini" v-model="formAdd.eduback">
                              
                               <el-option label="本科" value="1"></el-option>
                               <el-option label="硕士" value="2"></el-option>
                               <el-option label="博士" value="3"></el-option
                               <el-option label="其它" value="4"></el-option>
                              </el-select>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">入职时间:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                           <el-form-item label="" prop="hiredate" >
                              <el-date-picker  type="date" placeholder="选择日期" size="mini" style="width: 130px;" 
                              v-model="formAdd.hiredate" value-format="yyyy-MM-dd">
                              </el-date-picker>
                            </el-form-item>
                      </div>
                    </el-col>
                </el-row>
              <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">所在部门:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                          <el-form-item label="" prop='deptno'>
                                <el-select  placeholder="所在部门" 
                                size="mini" v-model="formAdd.deptno">
                                    <el-option
                                        v-for="item in deptList"
                                        :key="item.deptno"
                                        :label="item.deptname"
                                        :value="item.deptno">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                      </div>
                    </el-col>
                  <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">职位名称:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="job">
                           <el-input v-model="formAdd.job" placeholder="职位名称" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>
                </el-row>
                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">入职状态:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                      <div class="grid-content bg-purple">
                          <el-form-item label="" prop="status">
                              <el-select  placeholder="入职状态" size="mini" v-model="formAdd.status">
                                
                                <el-option label="在职" :value="1"></el-option>
                                <el-option label="停职" :value="2"></el-option>
                                <el-option label="离职" :value="0"></el-option>
                                
                              </el-select>
                          </el-form-item>

                      </div>
                    </el-col>
                        <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">备注:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="" prop="notes">
                           <el-input type="textarea" v-model="formAdd.notes"  :rows="2" placeholder="其他信息" >
                          </el-input>
                       </el-form-item>
                    </div>
                    </el-col>
                </el-row>
                <br/>
                  <el-form-item>
                    <el-input type="hidden"  v-model="formAdd.id"  />
                    <el-button type="warning" @click="dialogFormVisible2 = false" size="mini">取 消</el-button>
                    <el-button type="primary" @click="updateEmp('formAdd')" size="mini">保 存</el-button>
                  </el-form-item>
            </el-form>
            
            <br>
           
      </el-dialog>
<!-- 修改员工弹框---end -->
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

        _this.loading = false;
      },
      
      handleSelectionChange(val) {
        this.selItems = val;
      },

      refresh(){
        let _this = this;
        
        _this.searchClick(); 

        //页面加载查询所有员工
         this. axios({url:'/emp/all', method:"get"}) .then((resp)=>{    
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
    //打开新增员工模态框
    newEmp(){
        let _this = this;
        _this.dialogFormVisible = true;
        _this.formAdd.emono='',
        _this.formAdd.ename='',
        _this.formAdd.birthday='',
        _this.formAdd.gender='1',
        _this.formAdd.eduback='',
        _this.formAdd.deptno='',
        _this.formAdd.status='1',
        _this.formAdd.notes=''
      },
    getNowTime() {
	       var now = new Date();
	       var year = now.getFullYear(); //得到年份
	       var month = now.getMonth(); //得到月份
	       var date = now.getDate(); //得到日期
	       //var hour =" 00:00:00"; //默认时分秒 如果传给后台的格式为年月日时分秒，就需要加这个，如若不需要，此行可忽略
	       month = month + 1;
	       month = month.toString().padStart(2, "0");
	       date = date.toString().padStart(2, "0");
        // var defaultDate = `${year}-${month}-${date}${hour}`;
         var defaultDate = `${year}-${month}-${date}`;
	       console.log(defaultDate)
	       return defaultDate;
      },
    //保存员工信息
    addNewEmp(formName){
      this.$refs[formName].validate(valid => {
         if (valid) {
           
            this.axios({url:'/emp/add', method:"post",data:this.formAdd}) .then((resp)=>{
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
   //打开编辑员工模态框,并初始化值
    handleEdit(index, row){
        var _this = this;
        _this.dialogFormVisible2 = true;
        console.log("row"+row.id);
        _this.formAdd.empno=row.empno;
        _this.formAdd.ename=row.ename;
        _this.formAdd.birthday=row.birthday;
        _this.formAdd.gender=row.gender;
        _this.formAdd.eduback=row.eduback;
        _this.formAdd.deptno=row.deptno;
        _this.formAdd.job=row.job;
        _this.formAdd.status=row.status;
        _this.formAdd.notes=row.notes;
        _this.formAdd.id=row.id;

      },
    //保存修改员工信息
    updateEmp(formName){
       this.$refs[formName].validate(valid => {
         if (valid) {
           console.log(this.formAdd)
            this.axios({url:'/emp/updateById', method:"post",data:this.formAdd}) .then((resp)=>{
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
        this.$confirm('确认删除 "' + row.ename + '" ?', '提示', {
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
        this.axios.delete('/emp/delById?ids='+ids) .then((resp)=>{
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
          empno:'',
          ename:'',
          gender:'',
          birthday:'',
          hiredate:this.getNowTime(),
          eduback:'',
          deptno:'',
          status:'',
          job:'',
          notes:'',
       } ,

      deptList:[],


      pickerOptions: {
          disabledDate(v) {
              return v.getTime()> new Date().getTime() ;
           }
      },
      rules: {
          empno: [
            {required: true, message: "员工编号不能为空", trigger: 'blur'},
            {min: 4, max: 64, message: "员工编号4-64位数字字母",pattern: /^[a-zA-Z0-9]{4,64}$/, trigger: 'blur'}
          ],
          ename: [
            {required: true, message: "员工姓名不能为空", trigger: 'blur'},
            {min: 2, max: 50, message: "姓名3-50位中英文", pattern: /^[\u4E00-\u9FA5a-zA-Z]{2,50}$/,trigger: 'blur'}
          ],
          deptno: [
            {required: true, message: "部门不能为空", trigger: 'blur'}
          ],
          status: [
            {required: true, message: "状态不能为空", trigger: 'blur'}
          ]
      },
     showGender : function(row, column) {
                return row.gender == '1' ? "男" : row.gender == '0' ? "女" : "未知";
            },
     showStatus:function(row, column){
        if(row.status=='1'){
          return '在职';
        }else if(row.status=='2'){
          return '停职';
        }else{
          return '离职';
        }
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