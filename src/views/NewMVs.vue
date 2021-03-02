<template>
  <div class="newmvs-container">
    <div class="filter-wrap">
      <div class="seciton-wrap">
        <!-- 分类切换 地区 -->
        <span class="section-type">地区:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '全部' }"
              @click="area = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '内地' }"
              @click="area = '内地'"
            >
              内地
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '港台' }"
              @click="area = '港台'"
            >
              港台
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '欧美' }"
              @click="area = '欧美'"
            >
              欧美
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '日本' }"
              @click="area = '日本'"
            >
              日本
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: area == '韩国' }"
              @click="area = '韩国'"
            >
              韩国
            </span>
          </li>
        </ul>
      </div>
      <div class="type-wrap">
        <span class="type-type">类型:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '全部' }"
              @click="type = '全部'"
            >
              全部
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '官方版' }"
              @click="type = '官方版'"
            >
              官方版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '原声' }"
              @click="type = '原声'"
            >
              原声
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '现场版' }"
              @click="type = '现场版'"
            >
              现场版
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: type == '网易出品' }"
              @click="type = '网易出品'"
            >
              网易出品
            </span>
          </li>
        </ul>
      </div>
      <div class="order-wrap">
        <span class="order-type">排序:</span>
        <ul class="tabs-wrap">
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '上升最快' }"
              @click="order = '上升最快'"
            >
              上升最快
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最热' }"
              @click="order = '最热'"
            >
              最热
            </span>
          </li>
          <li class="tab">
            <span
              class="title"
              :class="{ active: order == '最新' }"
              @click="order = '最新'"
            >
              最新
            </span>
          </li>
        </ul>
      </div>
    </div>
    <!-- mv容器 -->
    <!-- 推荐MV -->
    <div class="mvs">
      <div class="items">
        <div class="item" v-for="(item, index) in list" :key="index">
          <div class="img-wrap" @click="toMv(item.id)">
            <img :src="item.cover" alt="" />
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
      <!-- 分页器 -->
      <div class="pagination">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="page"
          :page-size="5"
          :limit="limit"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewMvs",
  data() {
    return {
      // 总条数
      total: 20,
      // 页码
      page: 1,
      // 页容量
      limit: 8,
      // 地区
      area: "全部",
      // 类型
      type: "全部",
      // 排序
      order: "上升最快",
      // 查询的结果
      list: [],
    };
  },
  // 侦听器
  watch: {
    area() {
      // 返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
    type() {
      // 返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
    order() {
      // 返回第一页
      this.page = 1;
      // 获取数据
      this.getList();
    },
  },
  created() {
    // 获取数据
    this.getList();
  },
  methods: {
    // 获取列表数据
    getList() {
      // 获取数据
      this.$http({
        url: "https://autumnfish.cn/mv/all",
        method: "get",
        params: {
          area: this.area,
          type: this.type,
          order: this.order,
          // 数量
          limit: this.limit,
          // 偏移值 分页 (页码-1)*数量
          offset: (this.page - 1) * this.limit,
        },
      }).then((res) => {
        // console.log(res)
        this.list = res.data.data;
        // 处理次数
        for (let i = 0; i < this.list.length; i++) {
          if (this.list[i].playCount > 100000) {
            this.list[i].playCount =
              parseInt(this.list[i].playCount / 10000) + "万";
          }
        }

        // 保存总条数
        if (res.data.count) {
          this.total = res.data.count;
        }

        //时间格式化
        for (let i = 0; i < this.list.length; i++) {
          let min = parseInt(this.list[i].duration / 1000 / 60);
          let sec = parseInt((this.list[i].duration / 1000) % 60);
          if (min < 10) {
            min = "0" + min;
          }
          if (sec < 10) {
            sec = "0" + sec;
          }
          this.list[i].duration = min + ":" + sec;
        }
      });
    },
    // 页码改变的回调函数
    handleCurrentChange(val) {
      // 保存页面 重新获取数据
      this.page = val;
      this.getList();
    },
    //去MV详情页面
    toMv(id) {
      if (id != "") {
        this.$router.push("/mv?v=" + id);
      } else {
        console.log("未获取MV id");
      }
    },
  },
};
</script>

<style scoped lang="scss">
.newmvs-container {
  padding-top: 20px;
  padding-bottom: 60px;

  .filter-wrap {
    & > div {
      margin-bottom: 30px;
      vertical-align: baseline;
      display: flex;
      align-items: center;

      span {
        font-size: 14px;
        height: 100%;

        &.title {
          margin: 20px;
          color: gray;
          cursor: pointer;
          padding: 5px 20px;

          &.active {
            color: #dd6d60;
            background-color: #fcf6f5;
            border-radius: 20px;
          }

          &::before {
            content: "";
          }
        }
      }

      ul {
        display: flex;

        li:not(:last-child) {
          border-right: 1px solid #f2f2f1;
        }
      }
    }
  }

  .mvs {
    .items {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;

      .item {
        width: 250px;
        cursor: pointer;
        margin-right: 25px;
        margin-bottom: 30px;

        .img-wrap {
          width: 100%;
          position: relative;

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
    .pagination {
      position: relative;
      width: 100%;
      height: 60px;

      .el-pagination {
        position: absolute;
        bottom: 10px;
      }
    }
  }
}
</style>
