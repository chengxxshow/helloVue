<template>
 <el-container class="contrainer_bg">

  <el-main>
  <el-row :gutter="10">
    <el-col :span="12">
        <el-carousel :interval="1000"  height="400px" arrow="always" type="card">
          <el-carousel-item v-for="item in dataimg" :key="item">
            <div class="grid-content">
              <el-col :md="12" :offset="6">
                <div>
                  <img :src="item.src">
                  <p class="italictext">{{item.txt}}</p>
                  <span class="service">{{item.txt2}}</span>
                  <p class="last">{{item.txt3}}</p>
                </div>
              </el-col>
            </div>
          </el-carousel-item>
        </el-carousel>
      </el-col>

      <el-col :span="12">
       
            
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
              
        
       </el-col>
        
     </el-row>

  </el-main>
  

</el-container>
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
            {min: 3, max: 10, message: "用户名3-10位", trigger: 'blur'}
          ],
          password: [
            {required: true, message: "密码不能为空", trigger: 'blur'},
            {min: 3, max: 10, message: "密码3-10位", trigger: 'blur'}
          ]
      },
            dataimg: [{
						src: require('../assets/img01.png'),
						txt: '"11111111"',
						txt2: '一站式服务',
						txt3: 'Miami, FL'
					},
					{
						src: require('../assets/img02.png'),
						txt: '"22222222"',
						txt2: '国际服务',
						txt3: 'Greensboro, NC'
					},
					{
						src: require('../assets/img03.png'),
						txt: '"333333"',
						txt2: '全网渠道',
						txt3: 'Charlotte, NC'
					}
      ]
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
                   // this.$router.push("/hello"); 
                   var json = res.data;  
                   console.log(json); 
                    if (json == null || json.length == 0){
                          this.alert('用户名 密码 不存在或错误!', '登录失败!');
                        }
                        else {
                          this.$store.dispatch("setUser", true);
                          //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
                          //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。

                          //localStorage.setItem("Flag", "isLogin");
                          sessionStorage.setItem("Flag", "isLogin");

                          sessionStorage.setItem("name", json.username);
                          sessionStorage.setItem("useID", json.id);

                          
                          //登录成功后跳转到指定页面
                          this.$router.replace({path: '/home'});
                        }
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
  .contrainer_bg {
    height:580px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    overflow: hidden;
    background: #ccc;
  }
  .sub{
    width:100%;
  }

  .login-form {
    width: 350px;
    margin:50px auto;
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
