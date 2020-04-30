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
            <div class="picture-verify-container" v-if="pictureVerify">
              <div class="picture-verify">
                <Verify
                  @success="verifySuccess()"
                  @error="verifyError()"
                  :type="1"
                ></Verify>
              </div>
            </div>
            <div class="slide-verify-wrapper" v-if="slideVerify.show">
              <div class="slide-verify-close" @click="closeVerify()">
                <i class="el-icon-close"></i>
              </div>
              <slide-verify
                ref="slideblock"
                @again="onAgain"
                @fulfilled="onFulfilled"
                @success="onSuccess('loginForm')"
                @fail="onFail"
                @refresh="onRefresh"
                :slider-text="slideVerify.text"
                :accuracy="slideVerify.accuracy"
              ></slide-verify>
              <div>{{ slideVerify.msg }}</div>
            </div>
            <el-form
              :label-position="labelPosition"
              :model="loginForm"
              :rules="loginRules"
              ref="loginForm"
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="loginForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="loginForm.password"
                ></el-input>
              </el-form-item>
              <div id="login-btn">
                <el-button type="primary" @click="submitForm('loginForm')"
                  >登录</el-button
                >
                <el-button @click="resetForm('loginForm')">重置</el-button>
              </div>
            </el-form>
          </div>
          <div id="reg-form" v-show="!isLogin">
            <el-form
              :label-position="labelPosition"
              :model="regForm"
              :rules="regRules"
              ref="regForm"
              label-width="80px"
            >
              <el-form-item label="用户名" prop="username">
                <el-input v-model="regForm.username"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="regForm.password"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" required>
                <el-input
                  type="password"
                  v-model="regForm.checkPass"
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="生日" prop="birthday" required>
                <el-date-picker
                  type="date"
                  placeholder="选择日期"
                  v-model="regForm.birthday"
                  style="width: 100%;"
                ></el-date-picker>
              </el-form-item>
              <el-form-item label="性别" prop="gender">
                <el-radio-group v-model="regForm.gender">
                  <el-radio label="男"></el-radio>
                  <el-radio label="女"></el-radio>
                </el-radio-group>
              </el-form-item>
              <div id="login-btn">
                <el-button type="primary" @click="submitRegForm('regForm')"
                  >注册</el-button
                >
                <el-button @click="resetForm('regForm')">重置</el-button>
              </div>
            </el-form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import global from "../../common/global.js"
import axios from "axios"
import Verify from "vue2-verify"
export default {
  components: {
    Verify
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"))
      } else if (value !== this.regForm.password) {
        callback(new Error("两次输入密码不一致!"))
      } else {
        callback()
      }
    }
    return {
      isActived: true,
      isLogin: true,
      screenHeight: "",
      screenWidth: "",
      pictureVerify: false,
      labelPosition: "left",
      loginForm: {
        username: "",
        password: ""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      regForm: {
        username: "",
        password: "",
        checkPass: "",
        birthday: "",
        gender: ""
      },
      regRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        checkPass: [
          {
            validator: validatePass,
            trigger: "blur"
          }
        ],
        birthday: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        gender: [{ required: true, message: "请选择性别", trigger: "change" }]
      },
      slideVerify: {
        text: "向右滑动->",
        accuracy: 1,
        show: false
      }
    }
  },
  methods: {
    verifySuccess() {
      // this.$message('登录中，请稍后...')
      const loginReq = axios.create()
      loginReq
        .post(global.host + "login", {
          username: this.loginForm.username,
          password: this.loginForm.password
        })
        .then(res => {
          let userInfo = res["data"]["data"]
          alert(res.data.message)
          localStorage.setItem("user", JSON.stringify(userInfo))
          this.$router.push("/")
        })
        .catch(err => {
          // this.$message.error(err.response.data.message)
          console.log(err)
          alert(err)
          this.pictureVerify = false
          this.resetForm("loginForm")
        })
    },
    verifyError() {
      alert("验证码错误，请重新输入")
    },
    changeToReg: function() {
      this.isLogin = false
      this.isActived = false
    },
    changeToLogin: function() {
      this.isLogin = true
      this.isActived = true
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!")
          console.log(this.screenWidth)
          if (this.screenWidth >= 768) {
            this.slideVerify.show = true
          } else {
            this.pictureVerify = true
          }
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    submitRegForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!")
          const regReq = axios.create()
          regReq
            .post(global.host + "register", {
              username: this.regForm.username,
              password: this.regForm.password,
              birthday: this.regForm.birthday,
              gender: this.regForm.gender
            })
            .then(res => {
              let userInfo = res["data"]["data"]
              alert(res["data"]["message"])
              localStorage.setItem("user", JSON.stringify(userInfo))
              this.$router.push("/")
            })
            .catch(err => {
              alert(err.response.data.message)
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    //拼图验证方法：
    onSuccess(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // alert("submit!")
          const loginReq = axios.create()
          loginReq
            .post(global.host + "login", {
              username: this.loginForm.username,
              password: this.loginForm.password
            })
            .then(res => {
              let userInfo = res["data"]["data"]
              alert(res.data.message)
              localStorage.setItem("user", JSON.stringify(userInfo))
              this.$router.push("/")
            })
            .catch(err => {
              alert(err)
              this.slideVerify.show = false
              this.resetForm(formName)
            })
        } else {
          console.log("error submit!!")
          return false
        }
      })
    },
    onFail() {
      console.log("验证不通过")
      this.slideVerify.msg = ""
    },
    onRefresh() {
      console.log("点击了刷新小图标")
      this.slideVerify.msg = ""
    },
    onFulfilled() {
      console.log("刷新成功啦！")
    },
    onAgain() {
      console.log("检测到非人为操作的哦！")
      this.slideVerify.msg = "try again"
      // 刷新
      this.$refs.slideblock.reset()
    },
    handleClick() {
      this.$refs.slideblock.reset()
    },
    closeVerify() {
      this.slideVerify.show = false
    }
  },
  mounted() {
    this.screenHeight = window.innerHeight
    this.screenWidth = window.innerWidth
    window.onresize = () => {
      this.screenHeight = window.innerHeight
      this.screenWidth = window.innerWidth
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
.tab-wrapper {
  width: 60%;
  height: 30px;
  line-height: 30px;
  margin: 50px auto;
  text-align: center;
  border: 1px solid #848484;
  border-radius: 8px;
  overflow: hidden;
}
.tab-wrapper div {
  width: 50%;
  display: inline-block;
  cursor: pointer;
}
#login-form,
#reg-form {
  width: 60%;
  margin: 50px auto;
}
#login-btn {
  width: 100%;
  text-align: center;
}
.slide-verify-wrapper {
  width: 330px;
  height: 240px;
  background-color: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -120px;
  margin-left: -165px;
  z-index: 998;
  padding-top: 18px;
  padding-left: 18px;
  border-radius: 12px;
}
.slide-verify-close {
  position: absolute;
  top: 50px;
  right: 22px;
  z-index: 999;
}
.slide-verify-close:hover {
  cursor: pointer;
}
.slide-verify-close i {
  color: rgb(226, 225, 225);
  text-shadow: 0 0 8px rgb(104, 104, 104);
  font-size: 30px;
}
@media screen and (min-width: 1800px) {
  .container {
    background-size: 100% 100%;
  }
}
@media screen and (max-width: 768px) {
  .form {
    width: 360px;
    height: 600px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -180px;
    margin-top: -300px;
    background-color: rgba(255, 255, 255, 0.6);
    border-radius: 15px;
    box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
  }
  #login-form,
  #reg-form {
    width: 80%;
    margin: 50px auto;
  }
  .slide-verify-wrapper {
    width: 330px;
    height: 240px;
    background-color: white;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-top: -120px;
    margin-left: -174px;
    z-index: 998;
    padding-top: 18px;
    border-radius: 12px;
  }
  .picture-verify-container {
    position: fixed;
    width: 300px;
    height: 200px;
    z-index: 9999999;
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -150px;
    background-color: white;
  }
  .picture-verify {
    width: 202px;
    height: 140px;
    margin: 30px auto;
  }
}
</style>