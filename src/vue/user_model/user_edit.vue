<template>
  <el-dialog :title="title" :visible.sync="visible" @close="close('formData')" :close-on-click-modal="false"
             :close-on-press-escape="false">
    <el-form :model="user" ref="formData" :rules="formRules" :label-position="labelPosition">
      <div width="80%">
        <el-form-item label="名称" :label-width="formLabelWidth"  prop="username">
          <el-input v-model="user.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="年龄" :label-width="formLabelWidth"  prop="age">
          <el-input v-model.number="user.age" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth" prop="sex">
          <el-radio  v-model="user.sex" label="男">男</el-radio>
          <el-radio  v-model="user.sex" label="女">女</el-radio>
        </el-form-item>
        <el-form-item label="生日" :label-width="formLabelWidth" prop="birthday">
          <el-date-picker style="width: 100%" value-format="yyyy-MM-dd" type="date" :editable="false" v-model="user.birthday" auto-complete="off">
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
        title:"",
        formLabelWidth: '80px',
        labelPosition:'left',
        visible: this.show,
        user: {},
        formRules: {
          username:[
            { required: true, message: '请输入姓名' },
            { min: 2, max: 5, message: '长度在 2 到 5 个字符' }
          ],
          age:[
            { required: true, message: '年龄不能为空'},
            { type: 'number', message: '年龄必须为数字值'}
          ],
          birthday:[
            { required: true, message: '生日不能为空',trigger: 'change'}
          ],
          sex: [
            { required: true, message: '请选性别', trigger: 'change' }
          ],
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
        this.visible = this.show;
      }
    },
    methods: {
      queryUser (id) {//查询用户信息
        if(id==null || id==""){
          this.user={};//添加页面重置用户信息
          this.title="添加页面";
        }else{
          this.title="修改页面";
          this.$http.get('/api/users/'+id).then(
            (response) => {
              // 处理成功的结
              this.user = response.data
            }, (response) => {
              // 处理失败的结果
              console.log('失败')
            }
          )
        }

      },
      updateUser (form) {//保存用户信息
        this.$refs[form].validate((valid) => {
          if (valid) {//数据校验
            var userId = this.user.id
            if(userId ==null || userId==""){//ID不存在，则是添加
              this.$http.post('/api/users/', this.user
              ).then(
                (response) => {
                  // 处理成功的结
                  if (response.data == 1) {
                    this.$refs[form].resetFields();//重置表单状态
                    this.visible = false;
                    this.$message.success('保存成功！');
                    this.$emit('refreshList');
                  } else {
                    this.$message.error('保存失败！');
                  }
                }, (response) => {
                  // 处理失败的结果
                  console.log('失败')
                  this.$message.error('保存失败！')
                }
              )
            }else{//ID存在，修改操作
              console.log(userId)
              this.$http.put('/api/users/',this.user).then(
                (response) => {
                  // 处理成功的结
                  if (response.data == 1) {
                    this.$refs[form].resetFields();//重置表单状态
                    this.visible = false;
                    this.$message.success('修改成功！');
                    this.$emit('refreshList');
                  } else {
                    this.$message.error('修改失败！')
                  }
                }, (response) => {
                  // 处理失败的结果
                  console.log('失败')
                  this.$message.error('修改失败！')
                }
              )
            }
          } else {
            return false;
          }
        });
      },
      close (formData){//关闭模态窗
        this.$refs[formData].resetFields();//重置表单
        this.$emit('update:show', false);//设置父页面show属性为false
      }
    }
  }
</script>
