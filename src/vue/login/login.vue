<template>

  <el-container>
    <el-container>
      <el-header style="line-height: 25px">
        <div><h2 style="text-align: center">登录页面</h2></div>
      </el-header>
      <el-main>
        <el-form :model="userLogin"  ref="formData" :rules="formRules" status-icon label-width="100px" class="login-style">
          <el-form-item label="用户名" prop="username">
            <el-input type="text" v-model="userLogin.username" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密  码" prop="password">
            <el-input type="password" v-model="userLogin.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formData')">提交</el-button>
            <el-button @click="resetForm('formData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </el-container>

</template>
<style>
  .login-style {
    width: 30%;
    margin: auto;
  }
</style>
<script>
  export default {
    data () {
      return {
        userLogin: {
          username: '',
          password: ''
        },
        formRules: {
          username:[
            { required: true, message: '请输入用户名' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
          ],
          password:[
            { required: true, message: '请输入密码'},
            { min: 6, max: 15,  message: '年龄必须为数字值'}
          ]
        }
      }
    },
    methods: {
      submitForm (form) {
        this.$refs[form].validate((valid) => {
          if (valid) {//数据校验
            this.$http.post('/api/login', this.userLogin
            ).then(
              (response) => {
                console.log(response.data)
                if(response.data.status==401){
                  this.$message.error('登录失败，用户名或密码错误！')
                }else{
                  sessionStorage.token = response.data.result;
                  this.$notify({
                    title: '提示信息',
                    message: '登录成功',
                    type: 'success'
                  })
                  // 同事跳转到首页，这里使用vue-router实现
                  this.$router.push({path: '/'})
                }

              }, (response) => {
                // 处理失败的结果
                console.log('失败')
                this.$message.error('登录失败！')
              }
            )
          }else {
            return false;
          }
        })
      },
      resetForm (formData){
        this.$refs[formData].resetFields();//重置表单
      }
    }
  }
</script>
