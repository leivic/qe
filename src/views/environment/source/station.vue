<template>
  <div class="app-container">
    <div class="filter-container">
      <!--后端导入工位服务-->
      <el-upload
        action="http://localhost:8090/exportGongWeiFuHe"
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
        <template slot-scope="{row}"> <!--slot-scope是作用域插槽 意味着父组件提供样式就好，不用提供内容，内容由子组件内绑定的数据来提供 默认插槽和具名插槽子组件都是父组件又提供数据，又提供内容-->
          <span>{{ row.id }}</span><!--row是在此处自命名的,row其实是:data＝“list” 绑定的list数据,list是个数组-->
        </template>
      </el-table-column>

      <el-table-column label="工作模块" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.workModel }}</span>
        </template>
      </el-table-column>

      <el-table-column label="自查/抽查" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.ziPingORChouCha }}</span>
        </template>
      </el-table-column>

      <el-table-column label="评审内容" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.review }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工位名称" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stationName }}</span>
        </template>
      </el-table-column>

      <el-table-column label="适用条款" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.applicableTerms }}</span>
        </template>
      </el-table-column>

      <el-table-column label="符合条款" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.meetTheTerms }}</span>
        </template>
      </el-table-column>

      <el-table-column label="符合率" width="100px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.stationPercentage }}</span>
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

      <el-table-column label="#" width="100px" align="center">
        <template slot-scope="{row,$index}"><!--最开始的写法是 slot-scope="{row,$index}" 这个$index是vue2.0的key，在vue2.0的时候移除了--> 
          <el-button size="mini" type="danger" @click="handleDelete(row,$index,row.id)">
            Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { fetchListGongwei } from '@/api/qe'
import { deletGongWei } from '@/api/update'
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
      total: 60

    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() { // 获取数据
      this.listLoading = true
      fetchListGongwei(this.listQuery.page, this.listQuery.limit).then(response => {
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

    handleDelete(row, index, id) { // 点击删除按钮的操作
      this.$notify({ // 封装的通知功能
        title: 'Success',
        message: '删除成功',
        type: 'success',
        duration: 2000
      })
      this.list.splice(index, 1)// data property里面的数据更新，视图即更新
      deletGongWei(id)
    }

  }
}
</script>
