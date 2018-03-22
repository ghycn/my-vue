<template>
  <el-container>
    <el-header>
      <img class="my-vue" src="./assets/logo.png"/>
      <h2></h2>
    </el-header>
    <el-container>
      <el-aside width="260px">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
        >
          <router-link to="/">
            <el-menu-item index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">用户列表</span>
              </template>
            </el-menu-item>
          </router-link>
          <router-link to="/test">
            <el-menu-item index="2">
              <i class="el-icon-menu"></i>
              <span slot="title">导航二</span>
            </el-menu-item>
          </router-link>
          <el-menu-item index="3">
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </el-container>
</template>
<style>
  a {
    text-decoration: none
  }

  .el-header {
    background-color: #409EFF;
    color: #333;
    text-align: center;
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
  }

  .el-aside {
    background-color: #fff;
    color: #333;
    text-align: center;
    position: absolute;
    left: 0px;
    bottom: 0px;
    top: 60px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    position: absolute;
    bottom: 0px;
    top: 60px;
    left: 258px;
    right: 0px;
  }

  .my-vue {
    float: left;
    margin-top: 10px;
    width: 40px;
    height: 40px;
  }
</style>

