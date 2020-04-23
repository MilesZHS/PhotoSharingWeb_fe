<template>
  <div>
    <header-nav>
      <div id="identity-wrapper" v-if="isLogin">
        <router-link to="/user">
          <div id="avatar-wrapper">
            <img :src="avatar" id="avatar" alt="" />
          </div>
          <div id="username">
            {{ userName }}
          </div>
        </router-link>
      </div>
    </header-nav>
  </div>
</template>

<script>
import HeaderNav from "../../components/HeaderNav.vue"
export default {
  components: {
    HeaderNav
  },
  data() {
    return {
      isLogin: true,
      userName: "18560677018",
      avatar: require("../../assets/logo.png")
    }
  }
}
</script>

<style scoped>
#identity-wrapper {
  width: 100%;
  height: 60px;
  line-height: 60px;
}
#avatar-wrapper {
  width: 36px;
  height: 36px;
  overflow: hidden;
  border-radius: 50%;
  display: inline-block;
  vertical-align: middle;
}
#avatar {
  width: 36px;
  height: 36px;
  object-fit: cover;
  vertical-align: baseline;
}
#username {
  height: 60px;
  line-height: 60px;
  display: inline-block;
  padding-left: 10px;
  color: white;
}
@media screen and (max-width: 768px) {
  #username {
    color: #848484;
  }
}
</style>