import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import BookList from "@/components/BookList.vue"
import Login from "@/components/Login.vue"
import Register from "@/components/Register.vue"

const About = () => import("../views/About.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const Help = () => import("../views/Help.vue");
const Quiz = () => import("../views/Quiz.vue");
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/help",
    name: "Help",
    component: Help,
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/booklist",
    name: "BookList",
    component: BookList,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
