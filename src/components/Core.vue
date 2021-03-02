<template>
  <div class="core-container">
    <!-- 导航区域 -->
    <div class="nav">
      <ul>
        <li>
          <router-link to="/discovery">
            <span class="iconfont icon-find-music">
              <font-awesome-icon :icon="['fas', 'podcast']"></font-awesome-icon>
            </span>
            发现音乐
          </router-link>
        </li>
        <li>
          <router-link to="/playlist">
            <span class="iconfont icon-music-list">
              <font-awesome-icon :icon="['fas', 'list']"></font-awesome-icon>
            </span>
            推荐歌单
          </router-link>
        </li>
        <li>
          <router-link to="/songs">
            <span class="iconfont icon-music">
              <font-awesome-icon :icon="['fas', 'music']"></font-awesome-icon>
            </span>
            最新音乐
          </router-link>
        </li>
        <li>
          <router-link to="/newmvs">
            <span class="iconfont icon-mv">
              <font-awesome-icon :icon="['fas', 'film']"></font-awesome-icon>
            </span>
            最新MV
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 主体区域 -->
    <div class="main">
      <transition>
        <router-view></router-view>
      </transition>
    </div>

    <!-- 播放标签 -->
    <div class="player">
      <!-- autoplay 自动播放 -->
      <audio :src="musicUrl" controls autoplay></audio>
    </div>
  </div>
</template>

<script>
export default {
  name: "Core",
  data() {
    return {
      musicUrl: "",
    };
  },
};
</script>

<style scoped lang="scss">
.core-container {
  display: flex;
  margin-top: 60px;

  .nav {
    position: fixed;
    width: 200px;
    height: 100%;
    min-width: 140px;
    box-shadow: 0 2px 3px #ccc;

    ul {
      li {
        height: 60px;
        cursor: pointer;
        display: flex;
        align-items: center;

        &:hover {
          background-color: #e7e7e7;
        }

        a {
          color: black;
          padding-left: 30px;
          font-size: 18px;
          line-height: 60px;
          width: 100%;
          height: 100%;

          &.router-link-active {
            color: #dd6d60;

            .iconfont {
              color: #dd6d60;
            }
          }
        }

        .iconfont {
          margin-right: 10px;
          font-size: 20px;
        }
      }
    }
  }

  .main {
    flex: 1;
    padding: 10px 20px 10px 200px;

    & > div {
      max-width: 1100px;
      margin: 0 auto;
    }
  }

  audio {
    width: 100%;
    outline: none;
  }

  .player {
    background: #f1f3f4;
    height: 60px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
}
</style>