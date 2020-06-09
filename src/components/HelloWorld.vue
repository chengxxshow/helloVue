<template>

 <el-container class="hello">

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
              
          <el-form ref="form" :model="form" label-width="120px">
                <h2 class="login-title">企业人事管理系统</h2>
                <el-form-item  >
                  <i slot="label" class="el-icon-user-solid"></i> 
                  <el-input v-model="form.uname" placeholder="username"  prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                 <el-form-item  >
                  <i slot="label" class="el-icon-s-goods"></i> 
                  <el-input v-model="form.psw" placeholder="password"  prefix-icon="el-icon-s-goods" show-password></el-input>
                </el-form-item>
                <el-form-item>
                   <el-checkbox v-model="checked" >remember password</el-checkbox>
                </el-form-item>
                <el-form-item >
                   
                  <el-button class="sub" type="primary" @click="subClick">login</el-button>
                   
                </el-form-item>
          </el-form>
      </el-col>
        
     </el-row>

  </el-main>
  

</el-container>

</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      form:{
        uname:"",
        psw:""
      },
      checked: true,
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
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
</style>

<style >
  .hello {
    height:500px;
    position: absolute;
    top:0;
    left:0;
    right:0;
    bottom:0;
    margin:auto;
    overflow: hidden;
    border: 1px solid #E4E7ED;
   
    box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
  }
  .sub{
    width:100%;
  }
 
</style>
