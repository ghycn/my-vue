<template>
  <div>
    <div>
      <el-form  :inline="true" :model="condition" class="demo-form-inline search-form-custom">
        <el-form-item label="姓名">
          <el-input v-model="condition.name" placeholder="请输入姓名"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="condition.sex" placeholder="请选择">
            <el-option label="不限" value=""></el-option>
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button  @click="resetForm">重置</el-button>
          <el-button type="primary" @click="refreshList">查询</el-button>
          <el-button type="success" @click="handleEdit('')">添加</el-button>
        </el-form-item>
      </el-form>
    </div>
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
    <div style="margin-top: 10px;text-align: center" >
      <el-pagination background
                     @size-change="handleSizeChange"
                     @current-change="handleCurrentChange"
                     :current-page.sync="pagination.currentPage"
                     :page-size="pagination.pagesize"
                     layout="total, prev, pager, next, jumper"
                     :total="pagination.total">
      </el-pagination>
    </div>
    <!-- 引用模态窗 -->
    <my-dialog ref="myDialog" :show.sync="show" @refreshList="refreshList"></my-dialog>
  </div>
</template>
<script>
  import myDialog from './user_edit'

  export default {
    data () {
      return {
        condition: {
          name: null,
          sex: null
        },
        pagination: {//分页对象
          currentPage: 1,//当前页码
          pagesize: 10,//默认每页数据量
          total: 0//数据总条数
        },
        show: false,//模态窗默认隐藏
        tableData: [],//列表数据
      }
    },
    components: {//引入组件
      myDialog: myDialog
    },
    created: function () {//页面初始化方法
      this.refreshList()
    },
    methods: {
      refreshList: function () {
        var condition = JSON.stringify(this.condition)
        this.$http.get('/api/users/', {
          params: {
            'currentPage': this.pagination.currentPage, 'pagesize': this.pagination.pagesize,
            'condition': condition
          }
        }).then(
          (response) => {
            // 处理成功的结果
            this.tableData = response.data.list
            this.pagination.total = response.data.total
          }, (response) => {
            // 处理失败的结果
            console.log('失败')
          }
        )
      },
      resetForm (){//重置表单
        this.condition={};
      },
      //每页显示数据量变更
      handleSizeChange: function (val) {
        this.pagination.pagesize = val;
        this.refreshList();
      },

      //页码变更
      handleCurrentChange: function (val) {
        console.log(val)
        this.pagination.currentPage = val;
        this.refreshList();
      },

      handleEdit (id) {//修改回显
        this.show = true;
        this.$refs.myDialog.queryUser(id);
      },

      userAdd () {//添加用户
        this.show = true;
        console.log('添加用户')
      },
      handleDelete (id) {//删除用户
        this.$confirm('是否删除用户?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete('/api/users/'+id,).then(
            (response) => {
              // 处理成功的结
              if (response.data == 1) {
                this.$message.success('删除成功！')
                this.refreshList()
              } else {
                this.$message.error('删除失败！')
              }
            }, (response) => {
              // 处理失败的结果
              this.$message.error('删除失败！')
            }
          )
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>
