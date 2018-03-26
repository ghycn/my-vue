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

