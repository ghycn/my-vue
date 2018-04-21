<template>

  <el-container>
    <el-container>
      <el-header style="line-height: 25px">
        <div><h2 style="text-align: center">登录页面</h2></div>
      </el-header>
      <el-main>
        <el-form :model="userLogin" status-icon label-width="100px" class="login-style">
          <el-form-item label="用户名">
            <el-input type="text" v-model="userLogin.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="密  码">
            <el-input type="password" v-model="userLogin.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(userLogin)">提交</el-button>
            <el-button @click="resetForm('submitForm')">重置</el-button>
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
          name: '',
          password: ''
        }
      }
    },
    methods: {
      submitForm (form) {
        this.$http.post('/api/login', form
        ).then(
          (response) => {
            console.log(response.data)
            sessionStorage.token = response.data.data
            this.$notify({
              title: '提示信息',
              message: '登录成功',
              type: 'success'
            })
            // 同事跳转到首页，这里使用vue-router实现
            this.$router.push({path: '/'})
          }, (response) => {
            // 处理失败的结果
            console.log('失败')
            this.$message.error('登录失败！')
          }
        )
      }
    }

  }
</script>
