<template>
  <div class="items mv">
    <div class="item" v-for="(item, index) in mvList" :key="index">
      <div class="img-wrap">
        <img :src="item.cover" alt="" />
        <span class="iconfont icon-play" @click="toMv(item.id)">
          <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
        </span>
        <div class="num-wrap">
          <div class="iconfont icon-play">
            <font-awesome-icon :icon="['fas', 'play']"></font-awesome-icon>
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
</template>

<script>
export default {
  name: "ResultMv",
  data() {
    return {
      mvList: [],
      mvListCount: "",
    };
  },
  created() {
    this.getMvList();
  },
  methods: {
    //获取Mv数据
    getMvList() {
      this.$http({
        url: "https://autumnfish.cn/search",
        method: "get",
        params: {
          keywords: this.$route.query.v,
          type: "1004",
          limit: 10,
        },
      })
        .then((res) => {
          if (res.data.code == "200") {
            this.mvList = res.data.result.mvs;
            this.mvListCount = res.data.result.mvCount;
            //时间格式化
            for (let i = 0; i < this.mvList.length; i++) {
              let min = parseInt(this.mvList[i].duration / 1000 / 60);
              let sec = parseInt((this.mvList[i].duration / 1000) % 60);
              if (min < 10) {
                min = "0" + min;
              }
              if (sec < 10) {
                sec = "0" + sec;
              }
              this.mvList[i].duration = min + ":" + sec;
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
    //去MV详情页面
    toMv(id) {
      if (id != "") {
        this.$router.push("/mv?v=" + id);
      } else {
        console.log("未获取MV id");
      }
    },
    //传给父组件
    putData() {
      this.$emit("putData", this.mvListCount);
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

    .num {
      color: lightblue;
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