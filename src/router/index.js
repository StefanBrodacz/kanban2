import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Kanban from "@/views/Kanban";
import Kanban2 from "@/views/Kanban-2";
import StatusFlow from "@/components/StatusFlow";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "/status_flow",
    name: "Status Flow",
    component: StatusFlow
  },
  {
    path: "/kanban",
    name: "Kanban",
    component: Kanban
  },
  {
    path: "/kanban-2",
    name: "Kanban-2",
    component: Kanban2
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue")
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/Dashboard.vue")
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/Signup.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
