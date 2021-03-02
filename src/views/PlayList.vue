<template>
  <div class="playlist-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <!-- 封面 -->
        <img :src="topList.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <!-- 标题 -->
        <div class="title">
          {{ topList.name }}
        </div>
        <!-- 介绍 -->
        <div class="info">
          {{ topList.description }}
        </div>
      </div>
      <!-- 背景 -->
      <img :src="topList.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: tag == '全部' }"
          @click="tag = '全部'"
        >
          全部
        </span>
        <span
          class="item"
          :class="{ active: tag == '欧美' }"
          @click="tag = '欧美'"
        >
          欧美
        </span>
        <span
          class="item"
          :class="{ active: tag == '华语' }"
          @click="tag = '华语'"
        >
          华语
        </span>
        <span
          class="item"
          :class="{ active: tag == '流行' }"
          @click="tag = '流行'"
        >
          流行
        </span>
        <span
          class="item"
          :class="{ active: tag == '说唱' }"
          @click="tag = '说唱'"
        >
          说唱
        </span>
        <span
          class="item"
          :class="{ active: tag == '摇滚' }"
          @click="tag = '摇滚'"
        >
          摇滚
        </span>
        <span
          class="item"
          :class="{ active: tag == '民谣' }"
          @click="tag = '民谣'"
        >
          民谣
        </span>
        <span
          class="item"
          :class="{ active: tag == '电子' }"
          @click="tag = '电子'"
        >
          电子
        </span>
        <span
          class="item"
          :class="{ active: tag == '轻音乐' }"
          @click="tag = '轻音乐'"
        >
          轻音乐
        </span>
        <span
          class="item"
          :class="{ active: tag == '影视原声' }"
          @click="tag = '影视原声'"
        >
          影视原声
        </span>
        <span
          class="item"
          :class="{ active: tag == 'ACG' }"
          @click="tag = 'ACG'"
        >
          ACG
        </span>
        <span
          class="item"
          :class="{ active: tag == '怀旧' }"
          @click="tag = '怀旧'"
        >
          怀旧
        </span>
        <span
          class="item"
          :class="{ active: tag == '治愈' }"
          @click="tag = '治愈'"
        >
          治愈
        </span>
        <span
          class="item"
          :class="{ active: tag == '旅行' }"
          @click="tag = '旅行'"
        >
          旅行
        </span>
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div class="item" v-for="(item, index) in list" :key="index">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span class="iconfont icon-play" @click="toMusicList(item.id)">
                <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
              </span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>

    <el-pagination
      @current-change="handleCurrentChange"
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      :page-size="10"
    ></el-pagination>
    <!-- 分页器
      total 总条数
      current-page 当前页
      page-size 每页多少条数据
      current-change 页码改变事件
     -->
  </div>
</template>

<script>
export default {
  name: "PlayList",
  data() {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 顶部的推荐歌单
      topList: {},
      // 歌单列表
      list: [],
      // 当前选择的数据
      tag: "全部",
    };
  },
  // 侦听器
  watch: {
    tag() {
      // 顶部的 精品歌单
      this.topData();
      // 歌单列表
      this.listData();
      // 修改页码为1
      this.page = 1;
    },
  },
  created() {
    // 顶部的 精品歌单
    this.topData();
    // 歌单列表
    this.listData();
  },
  methods: {
    // 抽取的方法1 顶部的数据
    topData() {
      this.$http({
        url: "https://autumnfish.cn/top/playlist/highquality",
        method: "get",
        params: {
          limit: 1,
          // 分类数据
          cat: this.tag,
        },
      }).then((res) => {
        // console.log(res)
        this.topList = res.data.playlists[0];
      });
    },
    // 抽取的方法2 列表数据
    listData() {
      this.$http({
        url: "https://autumnfish.cn/top/playlist/",
        method: "get",
        params: {
          limit: 10,
          // 起始的值 （页码-1）*每页多少条数据
          offset: (this.page - 1) * 10,
          // 分类数据
          cat: this.tag,
        },
      }).then((res) => {
        // console.log(res)
        // 保存总条数
        this.total = res.data.total;
        // 保存数据
        this.list = res.data.playlists;
      });
    },
    // 页码改变事件
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`)
      // 保存页码
      this.page = val;
      // 重新获取数据
      this.listData();
    },
    //去歌单详情页面
    toMusicList(id) {
      if (id != "") {
        this.$router.push("/musiclist?v=" + id);
      } else {
        console.log("未获取歌单 id");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.playlist-container {
  .top-card {
    padding: 20px;
    height: 200px;
    display: flex;
    position: relative;
    overflow: hidden;
    border-radius: 5px;

    .icon-wrap {
      margin-right: 20px;
      z-index: 1;

      img {
        width: 160px;
        height: 160px;
      }
    }

    .content-wrap {
      z-index: 1;

      .tag {
        color: #dfac67;
        border: 1px solid #dfac67;
        width: 100px;
        height: 30px;
        text-align: center;
        border-radius: 5px;
        font-size: 16px;
        line-height: 30px;
        cursor: pointer;
      }

      .title {
        color: white;
        padding-top: 10px;
      }

      .info {
        color: #888482;
        font-size: 14px;
        padding-top: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
      }
    }

    .bg {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      z-index: 0;
      filter: blur(20px);
    }

    .bg-mask {
      width: 100%;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  .tab-container {
    padding-top: 30px;
    padding-bottom: 25px;

    .tab-bar {
      display: flex;
      justify-content: flex-end;

      .item {
        font-size: 15px;
        color: gray;
        margin-right: 20px;
        cursor: pointer;

        &.active {
          color: #dd6d60;
        }
      }
    }

    .tab-content {
      margin-top: 20px;

      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          width: 200px;
          margin: 10px;
          position: relative;
          overflow: hidden;
          cursor: pointer;

          img {
            width: 200px;
            height: 200px;
            border-radius: 5px;
          }

          .num-wrap {
            position: absolute;
            top: 0;
            left: 0;
            font-size: 14px;
            color: white;
            line-height: 30px;
            background: rgba(0, 0, 0, 0.5);
            height: 30px;
            width: 100%;
            padding-left: 5px;
            top: -30px;
            overflow: hidden;
          }

          &:hover .num-wrap {
            top: 0;
          }

          .img-wrap {
            position: relative;

            .icon-play {
              position: absolute;
              right: 10px;
              bottom: 13px;
              width: 40px;
              height: 40px;
              color: #dd6d60;
              font-size: 20px;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              background: rgba(255, 255, 255, 0.8);
              opacity: 0;

              &::before {
                transform: translateX(3px);
              }
            }

            &:hover .icon-play {
              opacity: 1;
            }
          }

          .name {
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-size: 14px;
          }
        }
      }
    }
  }
}
</style>
