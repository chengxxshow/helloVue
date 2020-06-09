<template>
  <div class="login-container">
     
      <el-form ref="form" :rules="rules" :model="form" label-width="80px" class="login-form">
        <h2 class="login-title">企业人事管理系统</h2>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">登录</el-button>
        </el-form-item>
      </el-form>
       
  </div>
</template>


   

<script>
  export default {
    data() {
      return {
        form: {
          username: "",
          password: ""
        },
        rules: {
          username: [
            {required: true, message: "用户名不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "用户名3-5位", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "密码3-5位", trigger: 'blur'}
          ]
      }
      };
    },
    methods: {
      submitForm(formName) {
          this.$refs[formName].validate(valid => {
              console.log(valid) //If a test passes as true, then any one that fails is false
            if (valid) {
              // the successful code
              console.log(this.form)
                this.axios({url:'/user/login', method:"post",data:this.form}) .then((res)=>{ 
                    this.$router.push("/hello"); 
                     
                }) .catch((res)=>{ 
                     console.log(res); 
                });
            } else {
              console.log('Failed validation');
              return false;
            }
          });
      }
    }
  };
</script>

  <style acoped>
  
  /* 背景 */
  .login-container {
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    background: #cccccc;
  }
  .login-form {
    width: 350px;
    margin: 150px auto; /* 上下间距160px，左右自动居中*/
    background-color: rgb(255, 255, 255, 0.8); /* 透明背景色 */
    padding: 30px;
    border-radius: 20px; /* 圆角 */
  }


  /* 标题 */
  .login-title {
    color: #303133;
    text-align: center;
  }
  </style> 
