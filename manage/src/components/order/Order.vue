<template>
  <div order-container>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
      </el-row>
    </el-card>

    <el-table :data="orderList" border stripe>
      <el-table-column type="index"></el-table-column>
      <el-table-column label="订单编号" prop="order_number"></el-table-column>
      <el-table-column label="订单价格" prop="order_price"></el-table-column>
      <el-table-column label="是否付款" prop="pay_status">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.pay_status === '1'">已付款</el-tag>
          <el-tag type="danger" v-else>未付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否发货" prop="is_send">
        <template slot-scope="scope">
          {{scope.row.is_send}}
        </template>
      </el-table-column>
      <el-table-column label="下单时间" prop="create_time">
        <template slot-scope="scope">
          {{scope.row.create_time | dateFormat}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <el-button size="mini" type="primary" icon="el-icon-edit" @click="showAddressEditDialog"></el-button>
        <el-button size="mini" type="success" icon="el-icon-location" @click="showAddressProgressDialog"></el-button>
      </el-table-column>
    </el-table>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
                   :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15]" :page-size="queryInfo.pagesize"
                   layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>

    <el-dialog title="修改地址" :visible.sync="addressEditVisible" width="50%" @close="addressEditDialogClose">
      <el-form :model="addressEditForm" :rules="addressEditRules" ref="addressEditFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <el-cascader :options="cityData" v-model="addressEditForm.address1"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressEditForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
          <el-button @click="addressEditVisible = false">取消</el-button>
          <!--这未绑定动作-->
          <el-button type="primary" @click="addressEditVisible = false">确定</el-button>
        </span>
    </el-dialog>

    <!-- 展示物流进度的对话框 -->
    <el-dialog title="物流进度" :visible.sync="addressProgressVisible" width="50%">
      <!--// 新版本直接有不需要引用？？？？-->
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in addressProgressInfo" :key="index" :timestamp="activity.time">
          {{activity.context}}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
  import cityData from './citydata.js'
  export default {
    name: 'o',
    data() {
      return {
        queryInfo: {
          query: '',
          pagesize: 10,
          pagenum: 1
        },
        total: 0,
        orderList: [],
        addressEditVisible: false,
        addressEditForm: {
          address1: [], // 地址数组
          address2: '',
        },
        addressEditRules: {
          address1: [
            { required: true, message: '请选择省市区/县', trigger: 'blur' }
          ],
          address2: [
            { required: true, message: '请填写详细地址', trigger: 'blur' }
          ]
        },
        cityData,
        addressProgressInfo: '',
        addressProgressVisible: false,
      }
    },
    created() {
      this.getOrderList()
    },
    methods: {
      async getOrderList() {
        const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
        if(res.meta.status !== 200) return this.$message.error('获取订单失败')
        console.log('getOrderList', res)
        this.total = res.data.total
        this.orderList = res.data.goods
      },
      handleSizeChange(newSize) {
        this.queryInfo.pagesize = newSize
        this.getOrderList()
      },
      handleCurrentChange(newPage) {
        this.queryInfo.pagenum = newPage
        this.getOrderList()
      },
      showAddressEditDialog() {
        this.addressEditVisible = true
      },
      addressEditDialogClose() {
        this.$refs.addressEditFormRef.resetFields()
      },
      async showAddressProgressDialog() {
        console.log('222hh')
        const { data: res } = await this.$http.get('/kuaidi/1106975712662')
        console.log('hh')
        if(res.meta.status !== 200) return this.$message.error('获取物流进度失败')
        this.addressProgressInfo = res.data
        this.addressProgressVisible = true
        console.log(this.addressProgressInfo)
      }
    }

  }
</script>

<style scoped>
  @import "../../assets/css/timeline.css";
  @import "../../assets/css/timeline-item.css";
</style>
