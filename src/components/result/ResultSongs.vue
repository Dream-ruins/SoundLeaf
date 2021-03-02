<template>
  <table class="el-table">
    <!-- 表头 -->
    <thead>
      <th></th>
      <th>音乐标题</th>
      <th>歌手</th>
      <th>专辑</th>
      <th>时长</th>
    </thead>
    <!-- 歌曲列表 -->
    <tbody>
      <tr
        class="el-table__row"
        v-for="(item, index) in songsData"
        :key="index"
        @dblclick="playMusic(item.id)"
      >
        <td>{{ index + 1 }}</td>
        <td>
          <div class="song-wrap">
            <div class="name-wrap">
              <!-- 歌曲名称 -->
              <span>{{ item.name }}</span>
              <!-- 播放MV图标 -->
              <span class="iconfont icon-mv" v-if="item.mvid != '0'">
                <font-awesome-icon :icon="['fas', 'film']"></font-awesome-icon>
              </span>
            </div>
            <!-- 歌曲副标题 -->
            <span class="song-subtitle" v-if="item.alias.length != 0">
              {{ item.alias[0] }}
            </span>
          </div>
        </td>
        <!-- 歌手 -->
        <td>{{ item.artists[0].name }}</td>
        <!-- 专辑 -->
        <td>{{ item.album.name }}</td>
        <!-- 时间 -->
        <td>{{ item.duration }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: "ResultSongs",
  data() {
    return {
      songsData: [], //歌曲列表
      songCount: "", //歌曲个数
      musicUrl: "", //点击歌曲链接
      //传给父组件的数据
      putFatherData: {
        songCount: "",
        musicUrl: "",
      },
    };
  },

  created() {
    this.getSongs();
  },
  methods: {
    // 获取歌曲列表
    getSongs() {
      this.$http({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.v,
          type: "1",
          limit: 10,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.songsData = res.data.result.songs;
            this.songCount = res.data.result.songCount;
            //时间格式化
            for (let i = 0; i < this.songsData.length; i++) {
              let min = parseInt(this.songsData[i].duration / 1000 / 60);
              let sec = parseInt((this.songsData[i].duration / 1000) % 60);
              if (min < 10) {
                min = "0" + min;
              }
              if (sec < 10) {
                sec = "0" + sec;
              }
              this.songsData[i].duration = min + ":" + sec;
            }
            this.putData();
          } else {
            console.log(res.data.statusText);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // 获取点击歌曲id
    playMusic(id) {
      console.log(id);
      this.$http({
        url: "https://autumnfish.cn/song/url",
        method: "get",
        params: {
          id,
        },
      }).then((res) => {
        this.musicUrl = res.data.data[0].url;
        //传值给父组件
        this.putData();
        //调用父组件播放音乐方法
        this.$emit("playMusic");
      });
    },
    //传给父组件
    putData() {
      this.putFatherData.songCount = this.songCount;
      this.putFatherData.musicUrl = this.musicUrl;
      this.$emit("putData", this.putFatherData);
    },
  },
  //监听路由
  watch: {
    $route(to, from) {
      location.reload([true]);
    },
  },
};
</script>

<style lang="scss" scoped>
.el-table {
  td {
    border-bottom: none;
  }

  th.is-leaf {
    border-bottom: none;
  }

  .song-subtitle {
    font-size: 10px;
    color: #c5c5c5;
  }

  .iconfont {
    margin-left: 12px;
    color: #dd6d60;
    cursor: pointer;
  }
}
</style>