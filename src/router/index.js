import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import auth from "../middleware/auth";

const About = () => import("../views/About.vue");
const Dashboard = () => import("../views/Dashboard.vue");
const Help = () => import("../views/Help.vue");
const Quiz = () => import("../views/Quiz.vue");
const Register = () => import("../views/Register.vue");
const ChatRoom = () => import("../components/ChatRoom.vue");
const LoadingScreen = () => import("../components/LoadingScreen.vue");
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
    component: About
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      middleware: auth
    }
  },
  {
    path: "/help",
    name: "Help",
    component: Help
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: Quiz
  },
  {
    path: "/register",
    name: "Register",
    component: Register
  },
  {
    path: "/loading/:username",
    name: "LoadingScreen",
    component: LoadingScreen
  },
  {
    path: "/chat/:id/:nickname",
    name: "ChatRoom",
    component: ChatRoom
  }
];

const router = new VueRouter({
  routes
});

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;
  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({ ...context, next: nextMiddleware });
  };
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];

    const context = {
      from,
      next,
      router,
      to
    };
    const nextMiddleware = nextFactory(context, middleware, 1);

    return middleware[0]({ ...context, next: nextMiddleware });
  }
  return next();
});

export default router;
