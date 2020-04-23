<template>
  <div>
    <header :class="{headerWhiteBg:whiteBg,hideSearchClass:isHideSearch}">
      <nav>
        <ul>
          <li id="logo" :class="{logoWhiteBg:whiteBg}"><router-link to="/">PhotoSharing</router-link></li>
          <li id="search" v-if="!isHideSearch">
            <div id="search-wrapper">
              <input
                type="text"
                id="search-input"
                placeholder="搜索图片关键词"
                 :class="{inputWhiteBg:whiteBg}"
              />
              <button id="search-btn"  :class="{buttonWhiteBg:whiteBg}">
                <i class="el-icon-search"></i> 搜索
              </button>
            </div>
          </li>
          <li id="identity" :class="{identityWhiteBg:whiteBg}">
            <slot>
              <router-link to="/identity">登录&nbsp;|&nbsp;注册</router-link>
            </slot>
          </li>
        </ul>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  props: ['bgColor','hideSearch'],
  data(){
    return {
      screenWidth: ''
    }
  },
  computed: {
    whiteBg(){
      if(this.bgColor === true){
        return true
      }else{
        return false
      }
    },
    isHideSearch(){
      if(this.screenWidth < 768 && this.hideSearch === true){
        return true
      }
      return false
    }
  },
  mounted(){
    this.screenWidth = window.innerWidth
    window.onresize = () => {
      this.screenWidth = window.innerWidth
    }
  }
}
</script>

<style>
header {
  position: relative;
  z-index: 999;
  width: 100%;
  height: 80px;
  line-height: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(75, 75, 75, 0));
}
nav {
  width: 90%;
  margin: 0% auto;
}
nav ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
@font-face {
  font-family: roseonly;
  src: url("../assets/tff/Roseonly.ttf");
}
#logo {
  line-height: 60px;
}
#logo a {
  font-family: roseonly;
  font-size: 36px;
  font-weight: 300;
  color: white;
  text-decoration: none;
}
#search-wrapper {
  width: 440px;
  height: 60px;
  line-height: 60px;
  overflow: hidden;
  margin: 0 auto;
  display: block;
}
#search-input {
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  width: 340px;
  height: 30px;
  padding-left: 16px;
  outline: none;
  border: none;
  background-color: rgba(255, 255, 255, 0.8);
  margin-right: 1px;
  color: #999999;
}
#search-btn {
  border-top-right-radius: 15px;
  border-bottom-right-radius: 15px;
  width: 80px;
  height: 30px;
  background: white;
  border: none;
  outline: none;
  overflow: hidden;
  vertical-align: middle;
  background-color: rgba(255, 254, 254, 0.8);
  color: #848484;
}
#search-btn:hover {
  background-image: linear-gradient(to right, #ff1b89, #f58166);
  color: white;
  cursor: pointer;
}
#identity {
  width: 200px;
  line-height: 60px;
  text-align: right;
}
#identity a {
  text-decoration: none;
  color: white;
  font-size: 12px;
}
#identity a:hover {
  color: #ff1b89;
}

/* 白色主题样式 */
.headerWhiteBg{
  background-color: #ffffff !important;
  border-bottom: 1px solid #c4c4c4 !important;
  background-image: none !important;
}
.logoWhiteBg a{
  color: #ff1b89 !important;
}
.identityWhiteBg a{
  color: #ff1b89 !important;
}
.inputWhiteBg{
  background-color: #f1f1f1 !important;
}
.buttonWhiteBg{
  background-color: #f1f1f1 !important;
}
@media screen and (max-width: 768px) {
  header {
    width: 100%;
    height: 120px;
    line-height: 60px;
    background-color: rgb(255, 255, 255);
    background-image: none;
  }
  .hideSearchClass{
    height: auto;
  }
  #logo a{
    /* background-image: -webkit-linear-gradient( #FF1A89, #F57F66);
    background-clip: text;
    -webkit-text-fill-color: transparent; */
    color: #fe2984;
  }
  nav {
    width: 90%;
    margin: 0% auto;
  }
  nav ul {
    list-style: none;
    display: flex;
    justify-content: space-between;
  }
  nav ul #search {
    position: absolute;
    top: 60px;
    width: 90%;
  }
  #search-wrapper {
    width: 100%;
    margin: 0% auto;
    overflow: hidden;
  }
  #search-input {
    width: 74%;
    background-color: #f1f1f1;
    border-top-right-radius: 0%;
    border-bottom-right-radius: 0%;
  }
  #search-btn {
    width: 20%;
    background-color: #f1f1f1;
  }
  #identity a {
    color: #848484;
  }
}
</style>