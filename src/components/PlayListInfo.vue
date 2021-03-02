<template>
  <div class="playlistinfo-container">
    <div class="top-wrap">
      <!-- 封面 -->
      <div class="img-wrap">
        <img :src="playList.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <!-- 歌单名称 -->
        <p class="title">{{ playList.name }}</p>
        <!-- 作者信息 -->
        <div class="author-wrap">
          <!-- 头像 -->
          <img class="avatar" :src="playList.creator.avatarUrl" alt="" />
          <!-- 名称 -->
          <span class="name">{{ playList.creator.nickname }}</span>
          <!-- 创建时间 -->
          <span class="time">{{ playList.createTime }} 创建</span>
        </div>
        <!-- 播放图标 -->
        <div class="play-wrap">
          <span class="iconfont icon-circle-play">
            <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
          </span>
          <span class="text">播放全部</span>
        </div>
        <!-- 标签 -->
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(item, index) in playList.tags" :key="index">
              {{ item }}
            </li>
          </ul>
        </div>
        <!-- 简介 -->
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playList.description }}</span>
        </div>
      </div>
    </div>
    <!-- 歌单列表 -->
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
        <table class="el-table playlit-table">
          <thead>
            <th></th>
            <th>歌曲图片</th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(item, index) in musicList"
              :key="index"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap music-img">
                  <el-image
                    :src="item.al.picUrl"
                    style="width: 70px; height: 70px"
                    :alt="item.al.name"
                    fit="cover"
                  />
                  <span class="iconfont icon-play">
                    <font-awesome-icon :icon="['fas', 'play']">
                    </font-awesome-icon>
                  </span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ item.name }}</span>
                    <span class="iconfont icon-mv"></span>
                  </div>
                  <span class="subtitle">{{ item.name }}</span>
                </div>
              </td>
              <td>{{ item.ar[0].name }}</td>
              <td>{{ item.al.name }}</td>
              <td>06:03</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane label="评论(66)" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论
            <span class="number">({{ hotTotal }})</span>
          </p>
          <div class="comments-wrap" v-if="hotCommentsData.length != 0">
            <!-- 评论 -->
            <div
              class="item"
              v-for="(item, index) in hotCommentsData"
              :key="index"
            >
              <!-- 用户头像 -->
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}：</span>
                  <!-- 评论内容 -->
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <!-- 昵称 -->
                  <span class="name">
                    {{ item.beReplied[0].user.nickname }}：
                  </span>
                  <!-- 回复内容 -->
                  <span class="comment">
                    {{ item.beReplied[0].content }}
                  </span>
                </div>
                <!-- 发表时间 -->
                <div class="date">2020-02-12 17:26:11</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 最新评论 -->
        <div class="comment-wrap">
          <p class="title">
            最新评论
            <span class="number">({{ newTotal }})</span>
          </p>
          <div class="comments-wrap" v-if="newCommentsData.length != 0">
            <!-- 评论 -->
            <div
              class="item"
              v-for="(item, index) in newCommentsData"
              :key="index"
            >
              <!-- 用户头像 -->
              <div class="icon-wrap">
                <img :src="item.user.avatarUrl" alt="" />
              </div>
              <div class="content-wrap">
                <div class="content">
                  <!-- 昵称 -->
                  <span class="name">{{ item.user.nickname }}：</span>
                  <!-- 评论内容 -->
                  <span class="comment">{{ item.content }}</span>
                </div>
                <!-- 回复 -->
                <div class="re-content" v-if="item.beReplied.length != 0">
                  <!-- 昵称 -->
                  <span class="name">
                    {{ item.beReplied[0].user.nickname }}：
                  </span>
                  <!-- 回复内容 -->
                  <span class="comment">{{ item.beReplied[0].content }}</span>
                </div>
                <!-- 发布时间 -->
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
          :total="newTotal"
          :current-page="page"
          :page-size="10"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "PlayListInfo",
  data() {
    return {
      //歌单数据
      playList: {},
      //歌单歌曲列表
      musicList: {},
      // 最热评论数据
      hotCommentsData: [],
      //评论个数
      hotTotal: "",
      //最新评论数据
      newCommentsData: [],
      //最新评论个数
      newTotal: "",
      //歌单个数
      musicListCount: "",
      //默认选择
      activeIndex: "1",
      // 页码
      page: 1,
    };
  },
  created() {
    this.getMusicListData();
    this.getHotCommentsData();
    this.getNewCommentsData();
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.page = val;
      this.getNewCommentsData();
    },
    //获取歌单信息
    getMusicListData() {
      this.$http({
        url: "https://autumnfish.cn/playlist/detail",
        method: "get",
        params: {
          id: this.$route.query.v,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.playList = res.data.playlist;
            this.musicList = this.playList.tracks;
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取歌单热门评论信息
    getHotCommentsData() {
      this.$http({
        url: "https://autumnfish.cn/comment/hot",
        method: "get",
        params: {
          id: this.$route.query.v,
          // 类型
          type: 2,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            //最热评论
            this.hotCommentsData = res.data.hotComments;
            //评论个数
            this.hotTotal = res.data.total;
          } else {
            this.$message.warning(res.data.stausTextCount);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取歌单最新评论信息
    getNewCommentsData() {
      this.$http({
        url: "https://autumnfish.cn/comment/playlist",
        method: "get",
        params: {
          id: this.$route.query.v,
          limit: 20,
          osffset: (this.page - 1) * 10,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            //最热评论
            this.newCommentsData = res.data.comments;
            //评论个数
            this.newTotal = res.data.total;
            console.log(res.data);
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
.playlistinfo-container {
  margin: auto;
  padding-top: 10px;
  padding-bottom: 58px;

  .subtitle {
    font-size: 12px;
    color: #c5c5c5;
  }

  .playlit-table {
    th,
    td {
      text-align: center;
    }
  }

  .music-img {
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

      &::before {
        transform: translateX(3px);
      }
    }

    &:hover .icon-play {
      opacity: 1;
    }
  }

  .top-wrap {
    display: flex;

    span {
      font-size: 17px;
    }

    .img-wrap {
      margin-right: 30px;

      img {
        width: 120px;
        height: 120px;
      }
    }

    .info-wrap {
      .title {
        margin-bottom: 20px;
      }

      .author-wrap {
        display: flex;
        align-items: center;
        margin-bottom: 25px;

        img {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          margin-right: 10px;
        }

        .name {
          margin-right: 10px;
        }

        .time {
          font-size: 14px;
        }
      }

      .play-wrap {
        width: 120px;
        height: 35px;
        border-radius: 4px;
        background: linear-gradient(to right, #e85e4d, #c6483c);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 25px;

        span {
          color: white;

          &.iconfont {
            margin-right: 8px;
          }

          &.text {
            font-size: 16px;
            cursor: pointer;
          }
        }
      }

      .tag-wrap {
        display: flex;
        margin-bottom: 15px;

        span {
          margin: 0;
        }

        ul {
          display: flex;
          align-items: center;
        }

        li {
          font-size: 15px;

          &:not(:last-child)::after {
            content: "/";
            margin: 0 4px;
          }
        }
      }

      .desc-wrap span:last-child {
        font-size: 15px;
      }

      span:first-child {
        margin-right: 10px;
      }
    }
  }

  .comment-wrap {
    margin-bottom: 70px;

    .title {
      font-size: 20px;

      .number {
        color: black;
        font-size: 18px;
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

      .date {
        color: #bebebe;
        font-size: 14px;
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
</style>