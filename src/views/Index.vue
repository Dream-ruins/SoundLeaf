<template>
  <div class="index-container">
    <top></top>
    <core></core>
  </div>
</template>

<script>
import Top from "@/components/Top";
import Core from "@/components/Core";

export default {
  name: "Index",
  components: { Core, Top },
};
</script>

<style lang="scss">
body,
html {
  height: 100%;
  margin: 0;
  padding: 0;
  font-weight: 400;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, "\5FAE\8F6F\96C5\9ED1", Arial, sans-serif;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  transition: 0.2s;
}

a {
  text-decoration: none;
}

ul,
ol {
  list-style: none;
}

.index-container {
  max-width: 1920px;
  min-height: 660px;
  position: relative;

  //背景图
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent url("../assets/img/七彩山.jpg") center center
      no-repeat;
    filter: blur(5px) opacity(50%);
    z-index: -1;
    background-size: cover;
  }

  .iconfont {
    cursor: pointer;
  }
}
</style>