<template>
  <el-dialog title="修改用户信息" :visible.sync="visible" @close="close('formData')" :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="user" ref="formData" :rules="formRules" :label-position="labelPosition">
      <div width="80%">
        <el-form-item label="名称" :label-width="formLabelWidth"  prop="name">
          <el-input v-model="user.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth"  prop="age">
          <el-input v-model.number="user.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" >
          <el-radio  v-model="user.sex" label="男">男</el-radio>
          <el-radio  v-model="user.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker value-format="yyyy-MM-dd" type="date" :editable="false" v-model="user.birthday" auto-complete="off">
          </el-date-picker>
        </el-form-item>
      </div>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="close('formData')">取 消</el-button>
      <el-button type="primary" @click="updateUser('formData')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data () {
      return {
        formLabelWidth: '80px',
        labelPosition:'left',
        visible: this.show,
        user: {},
        formRules: {
          name:[
            { required: true, message: '请输入姓名' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
          ],
          age:[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          birthday:[
            { required: true, message: '生日不能为空',trigger: 'change'}
          ]
        }
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
      updateUser (formData) {//保存用户信息
        this.$refs[formData].validate((valid) => {
          if (valid) {
            var formData = JSON.stringify(this.user)
            this.$http.get('/api/updateUser.do', {
              params: {formData: formData}
            }).then(
              (response) => {
                // 处理成功的结
                if (response.data == 1) {
                  this.visible = false
                  this.$message.success('保存成功！')
                  this.$emit('refreshList')
                } else {
                  this.$message.error('保存失败！')
                }
              }, (response) => {
                // 处理失败的结果
                console.log('失败')
                this.$message.error('保存失败！')
              }
            )
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      close (formData){//关闭模态窗
        this.$refs[formData].resetFields();//重置表单校验状态
        this.$emit('update:show', false);//设置父页面show属性为false
      }
    }
  }
</script>
