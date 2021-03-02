<template>
  <div class="top-container">
    <div class="left-box">
      <!-- logo -->
      <div class="icon-wrapper">
        <el-image
          style="width: 48px; height: 48px"
          :src="logo_url"
          fit="cover"
        ></el-image>
      </div>
      <!-- 箭头图标 -->
      <div class="history-wrapper">
        <!-- 放回上一页 -->
        <span class="iconfont" onClick="javascript :history.back(-1);">
          <font-awesome-icon :icon="['fas', 'angle-left']"></font-awesome-icon>
        </span>
        <!-- 下一页 -->
        <span class="iconfont" onClick="javascript :history.back(+1);">
          <font-awesome-icon :icon="['fas', 'angle-right']"></font-awesome-icon>
        </span>
      </div>
    </div>
    <!-- 搜索框 -->
    <div class="right-box">
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"
        class="input-with-select"
        @keyup.enter="toResult"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="toResult"
        ></el-button>
      </el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "Top",
  data() {
    return {
      searchValue: "", //搜索内容
      logo_url: require("../assets/img/music_logo.jpg"), //logo
    };
  },
  methods: {
    toResult() {
      //非空判断
      if (this.searchValue != "") {
        this.$router.push("/result?v=" + this.searchValue);
      } else {
        this.$message.warning("请您输入搜索内容");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.top-container {
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #f9f9f9;
  box-shadow: 0 0 4px #666;
  z-index: 99;
  max-width: 1920px;

  .left-box {
    display: flex;

    .icon-wrapper {
      margin-top: 5px;
      margin-right: 80px;

      .iconfont {
        margin-right: 10px;
        font-size: 12px;
        width: 18px;
        height: 18px;
        display: inline-block;
        text-align: center;
        line-height: 18px;

        &::before {
          opacity: 0;
          transition: 0.2s;
        }

        &:hover::before {
          opacity: 1;
        }
      }

      .icon-full-screen {
        background-color: #84bb58;
        border-radius: 50%;
      }

      .icon-sami-select {
        background-color: #dcc060;
        border-radius: 50%;
      }

      .icon-home {
        background-color: #dd6d60;
        border-radius: 50%;
      }
    }

    .history-wrapper {
      display: flex;
      align-items: center;

      .iconfont {
        width: 35px;
        height: 35px;
        font-size: 30px;
        text-align: center;
        line-height: 35px;
        color: gray;
        border-radius: 50%;
        transition: 0.2s;
        cursor: pointer;

        &:hover {
          background-color: #ebebeb;
        }

        &:first-child {
          margin-right: 10px;
        }
      }
    }
  }

  .right-box {
    display: flex;
    align-items: center;
    margin-right: 50px;
  }
}
</style>