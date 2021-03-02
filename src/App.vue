<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
//透明化整体
.el-table,
.el-table__expanded-cell {
  background-color: transparent !important;
}
//透明化行、单元格
.el-table th,
.el-table tr,
.el-table td {
  background-color: transparent !important;
}

//动画
.v-enter {
  opacity: 0;
  transform: translateX(100%);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-100%);
  position: absolute;
}

.v-enter-active,
.v-leave-active {
  transition: all 0.4s;
}
</style>
