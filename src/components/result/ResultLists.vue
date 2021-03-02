<template>
  <div class="items">
    <div class="item" v-for="(item, index) in listsData" :key="index">
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
</template>

<script>
export default {
  name: "ResultLists",
  data() {
    return {
      listsData: [],
      playListCount: "",
    };
  },
  created() {
    this.getLists();
  },

  methods: {
    getLists() {
      this.$http({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.v,
          type: "1000",
          limit: 10,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.listsData = res.data.result.playlists;
            this.playListCount = res.data.result.playlistCount;

            for (let i = 0; i < this.listsData.length; i++) {
              if (this.listsData[i].playCount > 10000) {
                this.listsData[i].playCount =
                  parseInt(this.listsData[i].playCount / 10000) + "万";
              }
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
    toMusicList(id) {
      if (id != "") {
        this.$router.push("/musiclist?v=" + id);
      } else {
        console.log("未获取歌单 id");
      }
    },
    //传给父组件
    putData() {
      this.$emit("putData", this.playListCount);
    },
  },
};
</script>

<style lang="scss" scoped>
.items {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;

  .item {
    width: 200px;
    cursor: pointer;
    margin-right: 20px;
    margin-bottom: 20px;

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
        align-items: center;
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

    .name {
      font-size: 15px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }

    .singer {
      font-size: 14px;
      color: #c5c5c5;
    }
  }

  .mv .item {
    width: 250px;
  }
}
</style>