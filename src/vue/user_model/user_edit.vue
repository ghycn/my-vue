<template>
  <el-dialog title="修改用户信息" :visible.sync="visible" @close="$emit('update:show', false)" :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="user" label-position="right">
      <div width="80%">
        <el-form-item label="名称" :label-width="formLabelWidth">
          <el-input v-model="user.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth">
          <el-input v-model="user.age" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-select v-model="user.sex" placeholder="请选择">
            <el-option
              label="男"
              value="男">
            </el-option>
            <el-option
              label="女"
              value="女">
            </el-option>
          </el-select>
          <!--<el-input v-model="user.sex" auto-complete="off"></el-input>-->
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth">
          <el-date-picker value-format="yyyy-MM-dd" type="date" :editable="false"  v-model="user.birthday" auto-complete="off"></el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:show', false)">取 消</el-button>
      <el-button type="primary" @click="updateUser()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        visible: this.show,
        user: {},
        formLabelWidth: '80px'
      }
    },
    props: {
      show: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      show () {
        this.visible = this.show
      }
    },
    methods: {
      queryUser (id) {//查询用户信息
        this.$http.get('/api/queryUserById.do', {
          params: {id: id}
        }).then(
          (response) => {
            // 处理成功的结
            this.user = response.data
          }, (response) => {
            // 处理失败的结果
            console.log('失败')
          }
        )
      },
      updateUser (){//保存用户信息
        var formData = JSON.stringify(this.user);
        this.$http.get('/api/updateUser.do', {
          params: {formData:formData}
        }).then(
          (response) => {
            // 处理成功的结
            if(response.data==1){
              this.visible = false
              this.$message.success('保存成功！');
              this.$emit('refreshList');
            }else{
              this.$message.error('保存失败！');
            }
          }, (response) => {
            // 处理失败的结果
            console.log('失败')
            this.$message.error('保存失败！');
          }
        )
      }
    }
  }
</script>
