<template>
  <div class="app-container">
    <div class="filter-container">

      <el-upload
        action="http://localhost:8090/exportGuoChenFuHe"
        multiple
        :limit="3"
      >
        <el-button :loading="uploadLoading" class="filter-item" type="primary" icon="el-icon-upload" @click="">
          导入
        </el-button>
      </el-upload>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    > <!--el-table的数据配置处是 :data-->
      <el-table-column label="ID" prop="id" sortable="custom" align="center" width="60" :class-name="getSortClass('id')">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span><!--row是封装的datalist对象-->
        </template>
      </el-table-column>

      <el-table-column label="评审区域" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pinShenQuYu }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评审时间" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.pinShenShiJian }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过程名称" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.guoChenMinChen }}</span>
        </template>
      </el-table-column>

      <el-table-column label="审计问题" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.auditQuestions }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过程配分" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.guoChenPeiFen }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过程得分" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.guoChenDeFen }}</span>
        </template>
      </el-table-column>

      <el-table-column label="过程得分率" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.guoChenPercentage }}</span>
        </template>
      </el-table-column>

      <el-table-column label="自查/抽查" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ziPinOrChouCha }}</span>
        </template>
      </el-table-column>

      <el-table-column label="迎审人员" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.yinShenRenYuan }}</span>
        </template>
      </el-table-column>

      <el-table-column label="#" width="100px" align="center">
        <template slot-scope="{row}">
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchListGuoChen } from '@/api/qe'
import Pagination from '@/components/Pagination'// 分页组件

export default {
  components: { Pagination },

  data() {
    return {
      tableKey: 0,
      uploadLoading: false,
      listLoading: true,
      list: null, // 图表数据
      listQuery: { // 分页相关数据
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
      total: 40

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取数据
      this.listLoading = true
      fetchListGuoChen(this.listQuery.page, this.listQuery.limit).then(response => {
        console.log(response)
        this.list = response // 获取真正的sql查询出来的数据
        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },

    sortChange(data) { // 排序改变
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },

    sortByID(order) { // 按id排序
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },

    handleFilter() { // 点击了页面控件
      this.listQuery.page = 1
      this.getList()
    },

    getSortClass: function(key) { // 排序相关
      			const sort = this.listQuery.sort
      			return sort === `+${key}` ? 'ascending' : 'descending'
		    },

    handleDelete(row, index) { // 点击删除按钮的操作
      this.$notify({ //封装的通知功能
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)// data property里面的数据更新，视图即更新
    }

  }
}
</script>

