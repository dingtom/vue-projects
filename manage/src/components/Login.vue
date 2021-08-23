<script src="../../vue.config.js"></script>
<template>
  <div class="login_container">
    <div class="login_box">
      <div class="avatar_box">
        <img src="../assets/logo.png" alt="">
      </div>
      <el-form class="login_form" ref="loginFormRef" :model="loginForm"
               :rules="loginFormRules" label-width="0px">
        <!--ref 拿到form组件实例对象 loginFormRef实例对象引用  ref作用：获取dom元素 调用子组件中的方法、数据-->
        <!--:model是v-bind:model的缩写-->
        <!--这种只是将父组件的数据传递到了子组件，并没有实现子组件和父组件数据的双向绑定**.，当然**引用类型除外**，子组件改变了引用类型的数据的话，父组件的数据也会跟着改变。-->
        <el-form-item prop="username">
          <!--表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的-->
          <!--prop 属性设置为需校验的字段名-->
          <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user">
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima"
                    type="password" show-password>
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        username: [
          { required: true, message: '请输入登陆名称', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在3-10个字符',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: '请输入登陆密码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 15,
            message: '长度在6-15个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    resetLoginForm () {
      this.$refs.loginFormRef.resetFields()
      // this当前login组件实例对象
      // resetFields	对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
    },
    login () {
      // 登陆前对表单进行验证
      this.$refs.loginFormRef.validate(async valid => {
        // validate	对整个表单进行校验的方法，参数为一个回调函数。该回调函数会在校验结束后被调用，
        // 并传入两个参数：是否校验成功和未通过校验的字段。若不传入回调函数，则会返回一个 promise
        // Function(callback: Function(boolean, object))
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        // { data 解构赋值
        // 方法返回结果是promise    可以用 async await promise简化操作
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage（会话期间存储机制 localStore持久化） 中
        //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
        //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
        window.sessionStorage.setItem('token', res.data.token)
        // 2. 通过编程式导航跳转到后台主页，路由地址是 /home
        this.$router.push('/home')
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background: #3c3f41;
  height: 100%;
}
.login_box {
  width: 400px;
  height: 300px;
  background: #ff374b;
  border-radius: 30px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  // 消除 left\top 50% 不包括自身偏移
  .avatar_box {
    height: 100px;
    width: 100px;
    padding: 10px;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #ff374b;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box
  //?????????????
}
.btns {
  display: flex;
  justify-content: center;
}

</style>
