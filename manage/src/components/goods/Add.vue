
<template>
  <div class="add-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card>
      <!-- 卡片视图 -->
      <el-alert title="添加商品信息" type="info" center show-icon :closable="false"></el-alert>
      <!-- 步骤条区域 -->
      <!--acitvate 表明步骤的 index，从 0 开始。 finish-status属性可以改变已经完成的步骤的状态。-->
      <el-steps :space="200" :activate="tabsActivateIndex - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <!-- tab栏区域 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px" label-position="top">
        <!--before-leave	切换标签之前的钩子，若返回 false 或者返回 Promise 且被 reject，则阻止切换。-->
        <!--tab-click	tab 被选中时触发           v-model	绑定值，选中选项卡的 name-->
        <el-tabs v-model="tabsActivateIndex" :tab-position="'left'" :before-leave="beforeTabsLeave"
                 @tab-click="tabsClick">
          <!--激活的tab的name会绑定的v-model的值上，这样实现-->
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="addForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="addForm.goods_price" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="addForm.goods_weight" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="addForm.goods_number" type="number"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="good_cat">
              <!--cateProps 配置选项    change	当选中节点变化时触发-->
              <el-cascader expand-trigger="hover" :options="cateList" :props="cateProps" v-model="addForm.goods_cat"
                           @change="handleCateListChange" size="medium">
              </el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <!-- 渲染表单的Item项 -->
            <el-form-item :label="item.attr_name" v-for="item in manyTableData" :key="item.attr_id">
              <!-- 复选框组 -->
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="cb" v-for="(cb, i) in item.attr_vals" :key="i" border></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in onlyTableData" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <!-- action 表示图片要上传到的后台API地址 on-preview	点击文件列表中已上传的文件时的钩子 -->
            <!-- headers图片上传组件的headers请求头对象  on-remove	文件列表移除文件时的钩子 -->
            <!--:on-success监听图片上传成功的事件-->
            <el-upload :action="uploadURL" :on-preview="handlePicPreview" :on-remove="handlePicRemove"
                       list-type="picture" :headers="headerObj" :on-success="handlePicSuccess">
              <!--button 没绑动作-->
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="addForm.goods_introduce"></quill-editor>
            <el-button type="primary" class="button-add" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>

    <el-dialog title="图片预览" :visible.sync="picPreviewVisible" width="50%">
      <img :src="picPreviewPath" alt="" class="preview-img" style="height: 200px; width: 100px">
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  name: 'a.vue',
  data() {
    return {
      addForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        // 商品所属的分类数组
        goods_cat: [],
        // 图片的数组
        pics: [],
        // 商品的详情描述
        goods_introduce: '',
        attrs: []
      },
      tabsActivateIndex: '0',
      addFormRules: {
        goods_name: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goods_price: [
          { required: true, message: '请输入商品价格', trigger: 'blur' }
        ],
        goods_weight: [
          { required: true, message: '请输入商品重量', trigger: 'blur' }
        ],
        goods_number: [
          { required: true, message: '请输入商品数量', trigger: 'blur' }
        ],
        goods_cat: [
          { required: true, message: '请选择商品分类', trigger: 'blur' }
        ]
      },
      // 商品分类列表
      cateList: [],
      cateProps: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children'
      },
      // 动态参数列表数据
      manyTableData: [],
      // 静态属性列表数据
      onlyTableData: [],
      // 上传图片的URL地址
      uploadURL: 'https://lianghj.top:8888/api/private/v1/upload',
      // uploadURL: 'http://127.0.0.1:8888/api/private/v1/upload',
      headerObj: {
        Authorization: window.sessionStorage.getItem('token')
      },
      picPreviewVisible: false,
      picPreviewPath: ''
    }

  },
  created() {
    this.getCateList()
  },
  methods: {
    async tabsClick() {
      // 动态参数/静态属性被点击调用,获得数据
      if (this.tabsActivateIndex === '1') {
        // ``     ''
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'many' } })
        if (res.meta.status !== 200) return this.$message.error('获取动态参数列表失败')
        console.log('tabsClick tabsActiveIndex=1', res.data)
        res.data.forEach(item => {
          // 属性值不为空，用,分割
          item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',')
        })
        this.manyTableData = res.data
      } else if (this.tabsActivateIndex === '2') {
        const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, { params: { sel: 'only' } })
        if (res.meta.status !== 200) return this.$message.error('获取静态属性列表失败')
        console.log('tabsClick tabsActiveIndex=2', res.data)
        this.onlyTableData = res.data
      }
    },
    handleCateListChange() {
      console.log('handleCateListChange', this.addForm.goods_cat)
      // goods_cat 必须要是三级
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = []
      }
    },
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) return this.$message.error('获取商品分类数据失败')
      this.cateList = res.data
      console.log('getCateList', this.cateList)
    },
    // 处理图片预览效果
    handlePicPreview(file) {
      console.log('handlePicPreview', file)
      this.picPreviewPath = this.uploadURL.split('api')[0] + file.response.data.tmp_path
      // 本地服务器的话
      // this.picPreviewPath = file.response.data.url
      this.picPreviewVisible = true
    },
    // 处理移除图片的操作
    handlePicRemove(file) {
      // 1. 获取将要删除的图片的临时路径
      const fileTmpPath = file.response.data.tmp_path
      // 2. 从 pics 数组中，找到这个图片对应的索引值
      const index = this.addForm.pics.findIndex(x => x.pic === fileTmpPath)
      // 3. 调用数组的 splice 方法，把图片信息对象，从 pics 数组中移除
      this.addForm.pics.splice(index, 1)
    },
    handlePicSuccess(response) {
      console.log('handlePicSuccess', response)
      const info = { pic: response.data.tmp_path }
      // 将图片信息对象，push 到pics数组中
      this.addForm.pics.push(info)
    },
    beforeTabsLeave(activeName, preActiveName) {
      if (preActiveName === '0' && this.addForm.goods_cat.length !== 3){
        this.$message.error('请先选择商品分类')
        return false
      }
    },
    add() {
      this.$refs.addFormRef.validate(async  valid => {
        if (!valid) return this.$message.error('请填写必要的表单')
        // 执行添加的业务逻辑
        // 级联选择器绑定的必须是数组，所以不能直接在原form上改
        // goods_cat以为','分割的分类列表
        const form = _.cloneDeep(this.addForm)
        form.goods_cat = form.goods_cat.join(',')

        // attrs商品的参数（数组），包含 `动态参数` 和 `静态属性`
        // 处理动态参数
        this.manyTableData.forEach(item => {
          const newInfo = {
            attr_id: item.attr_id,
            // attr_vals被处理成了数组，要变成字符串
            attr_value: item.attr_vals.join(' ')
          }
          this.addForm.attrs.push(newInfo)
        })
        // 处理静态属性
        this.onlyTableData.forEach(item => {
          const newInfo = { attr_id: item.attr_id, attr_value: item.attr_vals }
          this.addForm.attrs.push(newInfo)
        })
        form.attrs = this.addForm.attrs
        // 发起请求添加商品
        // 商品的名称，必须是唯一的
        const { data: res } = await this.$http.post('goods', form)
        if (res.meta.status !== 201) return this.$message.error('添加商品失败！')
        this.$message.success('添加商品成功！')
        this.$router.push('/goods')
      })
    }
  },
  computed: {
    cateId() {
      // 如果选择的是三级类,返回三级的分类
      if (this.addForm.goods_cat.length === 3) return this.addForm.goods_cat[2]
      return null
    }
  }
}
</script>

<style scoped>

</style>


<style lang="less" scoped>
  .el-checkbox {
    margin: 0 10px 0 0 !important;
  }

  .previewImg {
    width: 100%;
  }

  .btnAdd {
    margin-top: 15px;
  }


</style>
