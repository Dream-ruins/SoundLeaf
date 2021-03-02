<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">MV详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvUrl.url" :poster="mvData.cover"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="singerData.picUrl" alt="" />
          </div>
          <span class="name">{{ mvData.artists[0].name }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvData.name }}</h2>
          <span class="date">发布：{{ mvData.publishTime }}</span>
          <span class="number">播放：{{ mvData.playCount }}</span>
          <p class="desc">{{ mvData.desc }}</p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论<span class="number">({{ hotCommentsData.length }})</span>
        </p>
        <div class="comments-wrap">
          <div
            class="item"
            v-for="(item, index) in hotCommentsData"
            :key="index"
          >
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ commentTotal }})</span>
        </p>
        <div class="comments-wrap">
          <div class="item" v-for="(item, index) in commentsData" :key="index">
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name">
                  {{ item.beReplied[0].user.nickname }}：
                </span>

                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">2020-02-12 17:26:11</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        layout="prev, pager, next"
        :total="commentTotal"
        :current-page="page"
        :page-size="10"
        :limit="limit"
      >
      </el-pagination>
    </div>
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="(item, index) in aboutMvData" :key="index">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play">
                <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
              </span>
              <div class="num-wrap">
                <div class="iconfont icon-play">
                  <font-awesome-icon :icon="['fas', 'play']">
                  </font-awesome-icon>
                </div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MV",
  data() {
    return {
      //默认头像
      userImg: require("../assets/img/music_logo.jpg"),
      //mv数据
      mvData: {},
      //mv链接
      mvUrl: {},
      //相关MV
      aboutMvData: [],
      //歌手信息
      singerData: {},
      //评论数据
      commentsData: [],
      //评论数量
      commentTotal: "",
      //热门评论
      hotCommentsData: [],
      // 页码
      page: 1,
      // 页容量
      limit: 10,
    };
  },
  created() {
    this.getmvUrl();
    this.getMvData();
    this.getAboutMvData();
    this.getSingerData();
    this.getcommentData();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getcommentData();
    },
    //获取MV链接
    getmvUrl() {
      this.$http({
        url: "https://autumnfish.cn/mv/url",
        method: "get",
        params: {
          id: this.$route.query.v,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.mvUrl = res.data.data;
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取MV数据
    getMvData() {
      this.$http({
        url: "https://autumnfish.cn/mv/detail",
        method: "get",
        params: {
          mvid: this.$route.query.v,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.mvData = res.data.data;
            console.log(this.mvData);
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取相关MV数据
    getAboutMvData() {
      this.$http({
        url: "https://autumnfish.cn/simi/mv",
        method: "get",
        params: {
          mvid: this.$route.query.v,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.aboutMvData = res.data.mvs;
            //时间格式化
            for (let i = 0; i < this.aboutMvData.length; i++) {
              let min = parseInt(this.aboutMvData[i].duration / 1000 / 60);
              let sec = parseInt((this.aboutMvData[i].duration / 1000) % 60);
              if (min < 10) {
                min = "0" + min;
              }
              if (sec < 10) {
                sec = "0" + sec;
              }
              this.aboutMvData[i].duration = min + ":" + sec;
            }
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取歌手信息
    getSingerData() {
      this.$http({
        url: "https://autumnfish.cn/artists",
        method: "get",
        params: {
          id: this.mvData.artistId,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.singerData = res.data.artist;
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
          console.log(this.mvData.artistId);
        });
    },
    //获取评论数据
    getcommentData() {
      this.$http({
        url: "https://autumnfish.cn/comment/mv",
        method: "get",
        params: {
          id: this.$route.query.v,
          limit: 10,
          offset: (this.page - 1) * 10,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.commentsData = res.data.comments;
            this.hotCommentsData = res.data.hotComments;
            this.commentTotal = res.data.total;
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped lang="scss">
.mv-container {
  display: flex;
  padding-bottom: 58px;

  .title {
    margin-bottom: 40px;
  }

  .mv-wrap {
    width: 700px;
    margin-right: 35px;

    .date {
      margin-right: 25px;
      color: #bebebe;
      font-size: 14px;
    }

    .number {
      color: #bebebe;
      font-size: 14px;
    }

    .video-wrap {
      width: 680px;
      height: 380px;
      margin-bottom: 20px;

      video {
        border-radius: 5px;
        height: 100%;
        width: 100%;
        outline: none;
      }
    }

    .info-wrap {
      margin-bottom: 50px;

      .singer-info {
        display: flex;
        align-items: center;
        margin-bottom: 35px;

        .avatar-wrap {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          margin-right: 10px;
          overflow: hidden;

          img {
            height: 100%;
          }
        }
      }

      .mv-info {
        .title {
          font-size: 30px;
        }

        .desc {
          font-size: 15px;
          margin-top: 20px;
        }
      }
    }

    .comment-wrap {
      margin-bottom: 70px;

      .title {
        font-size: 25px;

        .number {
          color: black;
          font-size: 20px;
        }
      }

      .item {
        display: flex;
        padding-top: 20px;

        .icon-wrap {
          margin-right: 15px;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }

        &:not(:last-child) .content-wrap {
          border-bottom: 1px solid #f2f2f1;
        }

        .content-wrap {
          padding-bottom: 20px;
          flex: 1;

          .name {
            color: #517eaf;
            font-size: 14px;
          }

          .comment {
            font-size: 14px;
          }

          .content {
            margin-bottom: 10px;
          }

          .re-content {
            margin-bottom: 10px;
            padding: 10px;
            background-color: #e6e5e6;
            border-radius: 5px;
          }
        }
      }
    }
  }

  .mv-recommend {
    flex: 1;

    .mvs {
      .items {
        display: flex;
        flex-wrap: wrap;

        .item {
          cursor: pointer;
          width: 100%;
          display: flex;
          align-items: center;
          padding: 10px;
          cursor: pointer;

          &:hover {
            background-color: #f5f5f5;
          }

          .img-wrap {
            width: 180px;
            position: relative;
            margin-right: 10px;

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

              &::before {
                transform: translateX(3px);
              }
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

            .time {
              position: absolute;
              bottom: 5px;
              right: 5px;
              color: white;
              font-size: 15px;
            }
          }

          .info-wrap {
            flex: 1;

            .name {
              font-size: 15px;
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
}
</style>
