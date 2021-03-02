<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <!-- 循环获取到的接口数据 -->
      <el-carousel-item v-for="(item, index) in banners" :key="index">
        <img :src="item.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toMusicList(item.id)">
              <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
            </span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in songs" :key="index">
          <div class="img-wrap">
            <!-- 封面 -->
            <img :src="item.picUrl" alt="" />
            <span @click="playMusic(item.id)" class="iconfont icon-play">
              <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
            </span>
          </div>
          <div class="song-wrap">
            <!-- 歌名 -->
            <div class="song-name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="(item, index) in mvs" :key="index">
          <div class="img-wrap">
            <img :src="item.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toMv(item.id)">
              <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
            </span>
            <div class="num-wrap">
              <div class="iconfont icon-play">
                <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
              </div>
              <!-- 播放次数 -->
              <div class="num">{{ item.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <!-- mv名 -->
            <div class="name">{{ item.name }}</div>
            <!-- 歌手名 -->
            <div class="singer">{{ item.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 导入 axios
// import axios from 'axios'

export default {
  name: "Discovery",
  data() {
    return {
      // 轮播图
      banners: [],
      // 推荐歌单
      list: [],
      // 最新音乐
      songs: [],
      // 推荐mv
      mvs: [],
    };
  },
  created() {
    // console.log('created')
    // 轮播图接口
    this.$http({
      url: "https://autumnfish.cn/banner",
      method: "get",
    }).then((res) => {
      // console.log(res)
      this.banners = res.data.banners;
    });

    // 推荐歌单
    this.$http({
      url: "https://autumnfish.cn/personalized",
      method: "get",
      params: {
        // 获取的数据量
        limit: 10,
      },
    }).then((res) => {
      // console.log(res)
      this.list = res.data.result;
    });

    // 最新音乐
    this.$http({
      url: "https://autumnfish.cn/personalized/newsong",
      method: "get",
    }).then((res) => {
      // console.log(res)
      this.songs = res.data.result;
    });

    // 最新mv
    this.$http({
      url: "https://autumnfish.cn/personalized/mv",
      method: "get",
    }).then((res) => {
      // console.log(res)
      this.mvs = res.data.result;
    });
  },
  methods: {
    playMusic(id) {
      // console.log(id)
      this.$http({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        let url = res.data.data[0].url;
        // 设置给父组件的 播放地址
        this.$parent.musicUrl = url;
      });
    },
    //去MV详情页面
    toMv(id) {
      if (id != "") {
        this.$router.push("/mv?v=" + id);
      } else {
        console.log("未获取MV id");
      }
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
.discovery-container {
  padding-bottom: 60px;

  .el-carousel__container {
    height: 230px;
  }

  .el-carousel__item img {
    width: 100%;
    height: 100%;
    border-radius: 10px;
  }

  .title {
    font-weight: normal;
    margin-bottom: 20px;
    padding-left: 8px;
  }

  .iconfont {
    cursor: pointer;
  }

  .recommend {
    margin-bottom: 40px;

    .items {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 200px;
        margin: 10px;
        position: relative;
        overflow: hidden;

        img {
          width: 200px;
          height: 200px;
          border-radius: 5px;
        }

        .desc-wrap {
          position: absolute;
          width: 100%;
          top: 0;
          left: 0;
          font-size: 16px;
          color: white;
          background: rgba(0, 0, 0, 0.5);
          max-height: 50px;
          padding: 5px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          top: -50px;
        }

        .desc-wrap span {
          font-size: 14px;
        }

        &:hover .desc-wrap {
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
          -webkit-line-clamp: 1;
          font-size: 14px;
        }
      }
    }
  }

  .news {
    margin-bottom: 40px;

    .items {
      height: 500px;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      padding-left: 15px;

      .item {
        height: 100px;
        width: 50%;
        display: flex;
        align-items: center;

        &:hover {
          background-color: #f5f5f5;
        }

        .index {
          margin-right: 15px;
          font-size: 15px;
        }

        .img-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;

          img {
            width: 80px;
            height: 80px;
          }

          .iconfont {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            color: #dd6d60;
            text-align: center;
            line-height: 30px;
            border-radius: 50%;
            font-size: 14px;
            background: rgba(255, 255, 255, 0.8);
            opacity: 0;
          }

          .iconfont::before {
            transform: translateX(3px);
          }

          &:hover .iconfont {
            opacity: 1;
          }
        }

        .song-wrap {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          height: 100%;
          padding: 10px;
          font-size: 16px;

          .singer {
            font-size: 14px;
            color: gray;
          }
        }
      }
    }
  }

  .mvs {
    .items {
      display: flex;
      justify-content: space-around;

      .item {
        width: 250px;
        cursor: pointer;

        .img-wrap {
          width: 100%;
          position: relative;

          & > .icon-play {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
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
          }

          & > .icon-play::before {
            transform: translateX(3px);
          }

          &:hover > .icon-play {
            opacity: 1;
          }

          img {
            width: 100%;
            border-radius: 5px;
          }

          .num-wrap {
            position: absolute;
            color: white;
            top: 0;
            right: 0;
            display: flex;
            align-content: center;
            font-size: 15px;
            padding-right: 5px;
            padding-top: 2px;

            .icon-play {
              font-size: 12px;
              display: flex;
              align-items: center;
              margin-right: 5px;
            }
          }
        }

        .info-wrap {
          .name {
            font-size: 15px;
            margin-bottom: 5px;
          }

          .singer {
            font-size: 14px;
            color: #c5c5c5;
          }
        }
      }
    }
  }
}
</style>