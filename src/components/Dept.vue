<template>
<gao-el-container>

<el-row :gutter="2">
      <el-col :span="4">
      <div class="grid-content bg-purple">
           <el-input
        placeholder="请输入科室编号或名称" size="mini"
        v-model="keywords" style="width: 160px;">
      </el-input>
      </div>
      </el-col>

      <el-col :span="3">
      <div class="grid-content bg-purple">
           <el-button type="primary" size="mini" style="margin-left: 10px" icon="el-icon-view" @click="searchClick">查询科室</el-button>
      </div>
      </el-col>

      <el-col :span="3">
      <div class="grid-content bg-purple">
           <el-button type="primary" size="mini" style="margin-left: 10px" icon="el-icon-edit" @click="newDept()">新增科室</el-button>
      </div>
      </el-col>

      <el-col :span="3">
      <div class="grid-content bg-purple">
         <el-upload
            class="upload-demo"
            action="https://jsonplaceholder.typicode.com/posts/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="3"
            :on-exceed="handleExceed"
            :file-list="fileList"
            >
            <!--
            <el-button size="mini" type="primary" icon="el-icon-sold-out">导入科室</el-button>
            -->
          </el-upload>
      </div>
      </el-col>
  </el-row>
  <p></p>
  <!-- :data="categories"  -->  
  <gao-el-main class="cate_mana_main">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange" v-loading="loading">
        <el-table-column
          type="selection"
          width="55" align="left">
        </el-table-column>
        <el-table-column
          label="科室编号"
          prop="DeptCode"
          width="120" align="left">
        </el-table-column>
        <el-table-column
          label="科室名称"
          prop="DeptName"
          width="120" align="left">
        </el-table-column>

        <el-table-column
          label="科室分类"
          prop="ConstantName"
          width="120" align="left">
        </el-table-column>

        <el-table-column
          label="科室分类ID"
          prop="DeptCategoryID"
          width="120" align="left" v-if='false' >
<!--
  <template slot-scope="scope">
              {{ scope.row.DeptType|formatConstant }}
  </template>
-->  
        </el-table-column>

        <el-table-column
          label="科室类型"
          prop="DeptType"
          width="120" align="left"  >
  <template slot-scope="scope">
              {{ scope.row.DeptType|showScope }}
  </template>
        </el-table-column>

        <!-- v-if='false'  v-if='false'  v-if='false' -->
         <el-table-column
          label="ID"
          prop="ID"
          width="120" 
          align="left" 
          v-if='false'
          >
        </el-table-column>

        <el-table-column
          label="DeptCategoryID"
          prop="DeptCategoryID"
          width="120" 
          align="left"
          v-if='false'
          >
        </el-table-column>

         <el-table-column
          label="ID_dtid"
          prop="dtid"
          width="120" 
          align="left" 
          v-if='false'
          >
        </el-table-column>

        <el-table-column label="操作" align="left">
          <template slot-scope="scope">
            <!--
            <el-button type="primary"
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑0
            </el-button>
            -->

            <el-button type="primary"
              size="mini"
              @click="handleEdit2(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div>
      <el-row :gutter="2">
            <el-col :span="6">
            <el-button type="danger" :disabled="this.selItems.length==0" style="margin-top: 10px;width: 100px;" size="mini"
                 @click="deleteAll" v-if="this.tableData.length>0">批量删除
            </el-button>
            </el-col>
            <el-col :span="5">
            <el-pagination
              background
              :page-size="pageSize" :current-page.sync="currentPage01"
              layout="prev, pager, next"
              :total="totalCount" @current-change="currentChange" v-show="this.tableData.length>0">
            </el-pagination>
            </el-col>
      </el-row>
    </div>
</gao-el-main>

<!-- 新建科室弹框---start -->
        <el-dialog title="新建科室" :visible.sync="dialogFormVisible" width="550px" align="center">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit" class="demo-form-inline" size="mini">
                
               <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室编码:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="">
                          <el-input v-model="DeptCode02" placeholder="科室编码" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室名称:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         <el-form-item label="">
                            <el-input v-model="DeptName02" placeholder="科室名称" size="mini"></el-input>
                        </el-form-item>
                    </div>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室分类:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="">
                          <el-select  placeholder="科室分类" 
                           size="mini" v-model="DeptCategoryID02">
                           <el-option
                                v-for="item in categories3"
                                :key="item.ID"
                                :label="item.ConstantName"
                                :value="item.ID">
                             </el-option>
                          </el-select>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室类别:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         <el-form-item label="">
                              <el-select  placeholder="科室类别" 
                               size="mini" v-model="DeptTypeID02">
                               <el-option label="临床" value="1"></el-option>
                               <el-option label="医技" value="2"></el-option>
                               <el-option label="财务" value="3"></el-option>
                               <el-option label="行政" value="4"></el-option>
                               <el-option label="其它" value="5"></el-option>
                              </el-select>
                          </el-form-item>
                    </div>
                    </el-col>
                </el-row>
            </el-form>
            
            <br>
            <el-button type="warning" @click="dialogFormVisible = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="addNewCate()" size="mini">保 存</el-button>
      </el-dialog>
<!-- 新建科室弹框---end -->

<!-- 编辑科室弹框---start -->
        <el-dialog title="编辑科室" :visible.sync="dialogFormVisible3" width="550px" align="center">
            <el-form :label-position="labelPosition" :label-width="labelWidth" :inline="true" :model="formEdit" class="demo-form-inline" size="mini">
                
               <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室编码:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="">
                          <el-input v-model="DeptCode02" placeholder="科室编码" size="mini"></el-input>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室名称:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         <el-form-item label="">
                            <el-input v-model="DeptName02" placeholder="科室名称" size="mini"></el-input>
                        </el-form-item>
                    </div>
                    </el-col>
                </el-row>

                <el-row :gutter="2">
                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室分类:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                       <el-form-item label="">
                          <el-select  placeholder="科室分类" 
                           size="mini" v-model="DeptCategoryID02">
                             <el-option
                                v-for="item in categories3"
                                :key="item.ID"
                                :label="item.ConstantName"
                                :value="item.ID">
                             </el-option>
                          </el-select>
                       </el-form-item>
                    </div>
                    </el-col>

                    <el-col :span="4">
                    <div class="grid-content bg-purple">
                        <font style="font-size:13px;font-family:'Microsoft YaHei'">科室类别:</font>&nbsp;
                    </div>
                    </el-col>

                    <el-col :span="7">
                    <div class="grid-content bg-purple">
                         
                          <el-form-item label="">
                              <el-select  placeholder="科室类别" 
                               size="mini" v-model="DeptTypeID02">
                              
                               <el-option label="临床" value="1"></el-option>
                               <el-option label="医技" value="2"></el-option>
                               <el-option label="财务" value="3"></el-option>
                               <el-option label="行政" value="4"></el-option>
                               <el-option label="其它" value="5"></el-option>
                              </el-select>
                          </el-form-item>
                      </div>
                    </el-col>
                </el-row>
            </el-form>
            
            <br>
            <el-button type="warning" @click="dialogFormVisible3 = false" size="mini">取 消</el-button>
            <el-button type="primary" @click="updateDept()" size="mini">保 存</el-button>
      </el-dialog>
<!-- 编辑科室弹框---end -->
</gao-el-container>
</template>

// <script>
//   import {postRequest} from '../../utils/api'
//   import {putRequest} from '../../utils/api'
//   import {deleteRequest} from '../../utils/api'
//   import {getRequest} from '../../utils/api'
//   export default{
//     methods: {
//       addNewCate(){
         
//         var _this = this;
//         if (this.DeptCode02 == null || this.DeptCode02.length == 0
//             || this.DeptName02 == null || this.DeptName02.length == 0
//             || this.DeptCategoryID02 == null || this.DeptCategoryID02.length == 0
//             || this.DeptTypeID02 == null || this.DeptTypeID02.length == 0
//           ) {
//             _this.$message({
//               type: 'info',
//               message: '4数据不能为空!'
//             });
//           } 
//           else {
//             this.loading = true;
//               postRequest('/neusys/department/add', {DeptCode: this.DeptCode02, DeptName:this.DeptName02, DeptCategoryID:this.DeptCategoryID02,DeptType:this.DeptTypeID02}).then(resp=> {
//             if (resp.status == 200) {
//               var json = resp.data;
//               _this.$message({type: json.status, message: json.msg});
//               _this.DeptCode02 = '';
//               _this.DeptName02 = '';
//               _this.DeptCategoryID02 = '';
//               _this.DeptTypeID02 = '';
//               _this.refresh();
//             }
//             _this.loading = false;
//           }, resp=> {
//             if (resp.response.status == 403) {
//               _this.$message({
//                 type: 'error',
//                 message: resp.response.data
//               });
//             }
//             _this.loading = false;
//           });
//       }},
//       deleteAll(){
//         var _this = this;
//         this.$confirm('确认删除这 ' + this.selItems.length + ' 条数据?', '提示', {
//           type: 'warning',
//           confirmButtonText: '确定',
//           cancelButtonText: '取消'
//         }).then(()=> {
//           var selItems = _this.selItems;
//           var ids = '';
//           for (var i = 0; i < selItems.length; i++) {
//             ids += selItems[i].ID + ",";
//           }
//           _this.deleteCate(ids.substring(0, ids.length - 1));
//         }).catch(() => {
//           //取消
//           _this.loading = false;
//         });
//       },
//       updateDept(){
//         var _this = this;
//         if (this.DeptCode02 == null || this.DeptCode02.length == 0
//            || this.DeptName02 == null || this.DeptName02.length == 0
//            || this.DeptCategoryID02 == null || this.DeptCategoryID02.length == 0
//            || this.DeptTypeID02 == null || this.DeptTypeID02.length == 0 )
//         {
//             _this.$message({
//               type: 'info',
//               message: '4项数据不能为空!'
//             });
//         } 
//         else {
//          putRequest("/neusys/department/update", {ID: this.rowid02, DeptCode: this.DeptCode02, 
//          DeptName: this.DeptName02, DeptCategoryID: this.DeptCategoryID02, DeptType: this.DeptTypeID02}).then(resp=> {
//               var json = resp.data;
//               _this.$message({
//                 type: json.status,
//                 message: json.msg
//               });
//            }, resp=> {
//               if (resp.response.status == 403) {
//                 _this.$message({
//                   type: 'error',
//                   message: resp.response.data
//                 });
//               }
//               _this.loading = false;
//             }); 
//             _this.loading = false;
//             _this.DeptCode02 = '';
//             _this.DeptName02 = '';
//             _this.DeptCategoryID02= '';
//             _this.DeptTypeID02= '';
//             _this.dialogFormVisible3 = false;
//             _this.refresh();
//        }},
//       handleSelectionChange(val) {
//         this.selItems = val;
//       },
//       handleEdit2(index, row){
//         var _this = this;
//         _this.dialogFormVisible3 = true;
//         _this.DeptCode02 = row.DeptCode;
//         _this.DeptName02 = row.DeptName;
//         _this.DeptCategoryID02 = row.DeptCategoryID;
//         _this.DeptTypeID02 =''+row.DeptType;//row.dtid    parseInt(row.DeptType)   row.DeptType
//         _this.rowid02=row.ID;
//         //console.log("BBBBBB");
//       },
//       handleDelete(index, row){
//         let _this = this;
//         this.$confirm('确认删除 "' + row.DeptName + '"" ?', '提示', {
//           confirmButtonText: '确定',
//           cancelButtonText: '取消',
//           type: 'warning'
//         }).then(() => {
//           _this.deleteCate(row.ID);
//         }).catch(() => {
//           //取消
//           _this.loading = false;
//         });
//       },
//       //翻页相关
//       currentChange(currentPage){
//         this.currentPage01 = currentPage;
//         this.loading = true;
//         this.loadBlogs(currentPage, this.pageSize);
//       },
//       //翻页相关
//       currentChange202(currentPage202){
//         this.currentPage202 = currentPage202;
//         this.loading = true;
//         this.loadBlogs202(currentPage202, this.pageSize202);
//       },
//       //翻页相关 
//       searchClick(){
//           //this.loadBlogs(1, 20);//临时不翻页
//           this.loadBlogs(1, this.pageSize);
//       },
//       //翻页相关  
//       loadBlogs(page, count){
//         var _this = this;
//         var url = "/neusys/department/all?page=" + page + "&count=" + count + "&keywords=" + this.keywords + "&keywords2=" + this.keywords2;
//         getRequest(url).then(resp=> {
           
//            _this.loading = false;
          
//           if (resp.status == 200) {
//             _this.tableData = resp.data.list;
//             _this.totalCount = resp.data.totalCount;
//             _this.currentPage01 = page ;
//           } else {
//             _this.$message({type: 'error', message: '数据加载失败!'});
//           }
//         }, resp=> {
//           _this.loading = false;
//           if (resp.response.status == 403) {
//             _this.$message({type: 'error', message: resp.response.data});
//           } else {
//             _this.$message({type: 'error', message: '数据加载失败!'});
//           }
//         }).catch(resp=> {
//           //压根没见到服务器
//           _this.loading = false;
//           _this.$message({type: 'error', message: '数据加载失败!'});
//         })

//         //_this.loading = false;
//       },
//       newDept(){
//         let _this = this;
//         this.dialogFormVisible = true;
//         _this.DeptCode02 = '';
//         _this.DeptName02 = '';
//         _this.DeptCategoryID02 = '';
//         _this.DeptTypeID02 = '';
//       },
//       deleteCate(ids){
//         var _this = this;
//         this.loading = true;
//         //删除   01=/ucsys  02=/neusys
//         deleteRequest("/neusys/department/" + ids).then(resp=> {
//           var json = resp.data;
//           _this.$message({
//             type: json.status,
//             message: json.msg
//           });
//           _this.refresh();
//         }, resp=> {
//           _this.loading = false;
//           if (resp.response.status == 403) {
//             _this.$message({
//               type: 'error',
//               message: resp.response.data
//             });
//           } else if (resp.response.status == 500) {
//             _this.$message({
//               type: 'error',
//               message: '科室删除失败!'
//             });
//           }
//         })
//       },
//       refresh(){
//         let _this = this;
//         _this.searchClick(); 

//         /*
//         getRequest("/neusys/department/all").then(resp=> {
//           _this.tableData  = resp.data.list;
//           _this.loading = false;
//         }, resp=> {
//           if (resp.response.status == 403) {
//             _this.$message({
//               type: 'error',
//               message: resp.response.data
//             });
//           }
//           _this.loading = false;
//         });
//         */

//         //选取科室分类
//         getRequest("/neusys/constantItem/listByType?keywords=DeptCategory").then(resp=> {
//             _this.categories3 = resp.data.list;
//         });
//       }
//     },
//     mounted: function () {
//       this.loading = true;
//       this.refresh();
//     },
//     filters:{
//       showScope:function(scope){
//         if(scope=='1'){
//           return '临床';
//         }else if(scope=='2'){
//           return '医技';
//         }else if(scope=='3'){
//           return '财务';
//         }else if(scope=='4'){
//           return '行政';
//         }else{
//           return '其它';
//         }
//       }
//     },
//     data(){
//       return {
        
//         //翻页相关 { 
//         totalCount: 2,
//         currentPage01:1,
//         pageSize: 10,
//         //翻页相关 }
//         keywords: '',
//         keywords2: '',
//         DeptCode02:'',
//         DeptName02:'',
//         DeptCategoryID02:'',
//         DeptTypeID02:'',
//         selItems: [],
//         categories: [],
//         categories2: [],
//         categories3: [],
//         tableData: [],
//         loading: false,
//         dialogAddVisible: false,
//         dialogFormVisible: false,
//         dialogFormVisible3: false,
//         rowid02:'',
//       }
//     }
//  }
// </script>

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
</style>