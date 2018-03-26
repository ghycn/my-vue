<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }
  .el-select{
    width: 100%;
  }
  .el-dialog__body {
    width: 60%;
    margin: auto;
  }
  .el-form-item__content{
    text-align: left;
  }
</style>
<template>
  <div>
    <el-table
      :data="tableData"
      align="left"
      stripe
      style="width: 100%">
      <el-table-column sortable prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column sortable prop="sex" label="性别"></el-table-column>
      <el-table-column sortable prop="age" label="年龄"></el-table-column>
      <el-table-column sortable prop="birthday" label="生日"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row.id)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--分页组件-->
    <div class="block">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pagination.currentPage"
        :page-size="pagination.pagesize"
        layout="total, prev, pager, next, jumper"
        :total="pagination.total">
      </el-pagination>
    </div>
    <!-- 引用模态窗 -->
    <my-dialog ref="myDialog" :show.sync="show" @refreshList="refresList"></my-dialog>
  </div>
</template>
<script>
  import myDialog from './user_edit'

  export default {
    data () {
      return {
        pagination: {//分页对象
          currentPage: 1,//当前页码
          pagesize: 10,//默认每页数据量
          total:0//数据总条数
        },
        show: false,//模态窗默认隐藏
        tableData: [],//列表数据
      }
    },
    components: {
      myDialog:myDialog
    },
    created: function () {
      this.refresList();
    },
    methods: {
     refresList:function(){
        this.$http.get('/api/userList.do',{
          params:{'currentPage':this.pagination.currentPage,'pagesize':this.pagination.pagesize}
        }).then(
          (response) => {
            // 处理成功的结果
            this.tableData = response.data.list;
            this.pagination.total=response.data.total;
          }, (response) => {
            // 处理失败的结果
            console.log('失败')
          }
        )
      },

      //每页显示数据量变更
      handleSizeChange: function(val) {
        this.pagination.pagesize = val;
        this.refresList();
      },

      //页码变更
      handleCurrentChange: function(val) {
        this.pagination.currentPage = val;
        this.refresList();
      },

      handleEdit (id) {//修改回显
        this.show = true
        this.$refs.myDialog.queryUser(id);
      },
      handleDelete (id) {//删除用户
        this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.get('/api/deleteUser.do', {
            params: {id:id}
          }).then(
            (response) => {
              // 处理成功的结
              if(response.data==1){
                this.$message.success('删除成功！');
                this.refresList();
              }else{
                this.$message.error('删除失败！');
              }
            }, (response) => {
              // 处理失败的结果
              this.$message.error('保存失败！');
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>
