<template>
    <el-container>
      <div style="background-color: #545c64">
        <div v-show="!isCollapse">
          <div style="text-align: center;background-color:#263949">
            <img width="120px" src="./assets/logo.png" />
          </div>
        </div>
        <el-menu class="el-menu-vertical" default-active="1" :collapse="isCollapse"
                 background-color="#545c64"
                 text-color="#fff"
                 active-text-color="#ffd04b">
          <router-link to="/">
            <el-menu-item index="1">
                <i class="el-icon-location"></i>
                <span slot="title">用户列表</span>
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
      </div>
      <el-container>
        <el-header style="line-height: 25px">
          <div style="float:left;margin-top: 20px;">
             <i style="cursor: pointer;font-size: 25px" class="el-icon-menu" @click="shrinkSide"></i>
          </div>
          <div><h2 style="text-align: center">VUE+ELEMENT UI 测试项目</h2></div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
</template>
<style>
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 200px;
    text-align: center;
  }
  .el-menu{
    border-right: 0px ;
  }
</style>
<script>
  export default {
    data() {
      return {
        isCollapse: false//菜单缩放控制
      }
    },
    methods: {
      shrinkSide (){
        if(this.isCollapse==false){
          this.isCollapse=true;

        }else{
          this.isCollapse=false;
        }
      }
    }
  }
</script>
