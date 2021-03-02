<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ this.$route.query.v }}</h2>
      <span class="sub-title">找到 {{ indexCount }} 个结果</span>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲" name="songs">
        <result-songs
          @putData="getSongData"
          @playMusic="playMusic"
        ></result-songs>
      </el-tab-pane>

      <el-tab-pane label="歌单" name="lists">
        <result-lists @putData="getMusicListData"></result-lists>
      </el-tab-pane>

      <el-tab-pane label="MV" name="mvs">
        <result-mv @putData="getMvData"></result-mv>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ResultSongs from "../components/result/ResultSongs.vue";
import ResultLists from "../components/result/ResultLists.vue";
import ResultMv from "../components/result/ResultMv.vue";
export default {
  name: "Result",
  data() {
    return {
      activeIndex: "songs",
      songCount: "", //歌曲个数
      musicUrl: "", //歌曲链接
      musicListCount: "", //歌单个数
      mvCount: "", //MV个数
      indexCount: "",
    };
  },
  components: {
    ResultSongs,
    ResultLists,
    ResultMv,
  },
  methods: {
    // 获取子组件传的值
    getSongData(data) {
      this.songCount = data.songCount;
      this.musicUrl = data.musicUrl;
      this.indexCount = this.songCount;
    },
    getMusicListData(data) {
      this.musicListCount = data;
    },
    getMvData(data) {
      this.mvCount = data;
    },
    //播放音乐
    playMusic() {
      this.$parent.musicUrl = this.musicUrl;
    },
  },
  //侦听器
  watch: {
    activeIndex() {
      switch (this.activeIndex) {
        //歌曲
        case "songs":
          this.indexCount = this.songCount;
          break;
        //歌单
        case "lists":
          this.indexCount = this.musicListCount;
          break;
        //MV
        case "mvs":
          this.indexCount = this.mvCount;
          break;

        default:
          break;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.result-container {
  .title-wrap {
    display: flex;
    align-items: flex-end;
    margin-bottom: 30px;

    .title {
      margin-right: 10px;
    }

    .sub-title {
      font-size: 15px;
      color: #ccc;
    }
  }

  .el-tabs__item {
    font-size: 18px;
  }
}
</style>
