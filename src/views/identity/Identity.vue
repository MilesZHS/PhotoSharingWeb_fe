<template>
  <div class="container" :style="{ height: screenHeight + 'px' }">
    <section class="main">
      <div class="form">
        <div class="tab-wrapper">
          <div
            id="tab1"
            :class="{ actived: isActived }"
            @click="changeToLogin()"
          >
            登录
          </div>
          <div
            id="tab2"
            :class="{ actived: !isActived }"
            @click="changeToReg()"
          >
            注册
          </div>
        </div>
        <div class="form-wrapper">
          <div id="login-form" v-show="isLogin">
            <el-form
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-width="100px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
							<el-form-item label="密码" prop="password">
                <el-input type="password" v-model="loginForm.password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('loginForm')"
                  >登录</el-button
                >
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div id="reg-form" v-show="!isLogin">
            注册
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isActived: true,
      isLogin: true,
      screenHeight: "",
      loginForm: {
        username: "",
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
				],
				password: [
					{ required: true, message: '请输入密码', trigger: 'blur'}
				]
			}
    }
  },
  methods: {
    changeToReg: function() {
      this.isLogin = false
      this.isActived = false
    },
    changeToLogin: function() {
      this.isLogin = true
      this.isActived = true
		},
		submitForm(formName) {
			this.$refs[formName].validate((valid) => {
				if (valid) {
					alert('submit!');
				} else {
					console.log('error submit!!');
					return false;
				}
			})
		},
		resetForm(formName) {
			this.$refs[formName].resetFields();
		}	
  },
  mounted() {
    this.screenHeight = window.innerHeight
    window.onresize = () => {
      this.screenHeight = window.innerHeight
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  background-image: url("../../assets/login_bg.png");
  background-size: 100% 100% cover;
  background-position: center;
  background-repeat: no-repeat;
}
.form {
  width: 600px;
  height: 700px;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -300px;
  margin-top: -350px;
  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
}
.actived {
  color: white;
	background-color: #ff1b89;
}
.tab-wrapper{
	width: 60%;
	height: 30px;
	line-height: 30px;
	margin: 20px auto;
	text-align: center;
	border: 1px solid #848484;
	border-radius: 8px;
	overflow: hidden;
}
.tab-wrapper div{
	width: 50%;
	display: inline-block;
	cursor: pointer;
}
@media screen and (min-width: 1800px) {
  .container {
    background-size: 100% 100%;
  }
}
</style>