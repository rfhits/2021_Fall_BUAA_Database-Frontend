import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import Manage from "../views/Manage";
import Sidebar from "../components/Sidebar";
import SelectCourse from "../views/manage/SelectCourse";
import QueryCourse from "../views/manage/QueryCourse";
import UserInfo from "../views/manage/UserInfo";

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/manage',
    name: '/manage',
    component: Manage,
    redirect: "/manage/select-course",
    children: [
      {
        path: '/manage/select-course',
        name: 'SelectCourse',
        component: SelectCourse
      },
      {
        path: '/manage/query-course',
        name: 'QueryCourse',
        component: QueryCourse
      },
      {
        path: '/manage/user-info',
        name: 'UserInfo',
        component: UserInfo
      }
    ]
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
