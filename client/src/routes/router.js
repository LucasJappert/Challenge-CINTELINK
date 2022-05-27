import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
    {
      path: "/",
      name: "User",
      component: () => import("../views/UserView.vue"),
    },
    {
        path: "/Login",
        name: "Login",
        component: () => import("../views/LoginView.vue"),
    },
    {
        path: "/Admin",
        name: "Admin",
        component: () => import("../views/AdminView.vue"),
    },
];


const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
