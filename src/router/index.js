import Vue from "vue";
import VueRouter from "vue-router";

//路由组件
import Index from "@/views/Index";
import Discovery from "@/views/Discovery";
import PlayList from "@/views/PlayList";
import Songs from "@/views/Songs";
import NewMVs from "@/views/NewMVs";
import Result from "@/views/Result";
import MV from "@/components/MV";
import PlayListInfo from "@/components/PlayListInfo";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/discovery",
    component: Index,
    children: [
      {
        path: "/discovery",
        component: Discovery,
      },
      {
        path: "/playlist",
        component: PlayList,
      },
      {
        path: "/songs",
        component: Songs,
      },
      {
        path: "/newmvs",
        component: NewMVs,
      },
      {
        path: "/result",
        component: Result,
      },
      {
        path: "/mv",
        component: MV,
      },
      {
        path: "/musiclist",
        component: PlayListInfo,
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
