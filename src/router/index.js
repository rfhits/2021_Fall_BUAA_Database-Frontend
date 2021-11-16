import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import ArticleCard from "../views/article/ArticleCard";
import Sidebar from "../components/Sidebar";
import ArticleEditor from "../components/editor/index"
import NewArticle from "../views/article/NewArticle"
import ArticleDetail from "../views/article/ArticleDetail"
import User from "../views/user/User"
import CommentCard from "@/components/comment/CommentCard"
import PostComments from "@/views/user/PostComments"
import PostArticles from "@/views/user/PostArticles"
import Bought from "@/views/user/Bought"
import Cart from "@/views/user/Cart"
import Followers from "@/views/user/Followers"
import Followings from "@/views/user/Followings"
import ChangePassword from "@/views/user/ChangePassword"
import EditInfo from "@/views/user/EditInfo"
import DevLjj from "@/DevLjj"
import Topic from '@/views/Topic'


const routes = [
  {
    path: '/dev-ljj',
    name: "DevLjj",
    component: DevLjj
  },
  {
    path: '/comment-card',
    name: "cc",
    component: CommentCard
  },
  {
    path: '/article/:articleId',
    name: 'Article',
    component: ArticleDetail,
    meta: {title: "ArticleDetails"},
    props: true,
  },
  {
    path: '/new-article',
    name: 'NewArticle',
    component: NewArticle
  },
  {
    path: '/card',
    name: 'Card',
    component: ArticleCard
  },
  {
    path: '/editor',
    name: 'Editor',
    component: ArticleEditor
  },
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
    path: '/user/:username/',
    name: 'User',
    component: User,
    redirect: to => {
      const {hash, params, query} = to
      if (params.username) {
        return '/user/'+params.username+'/posts'
      }
    },
    // redirect: '/user/'+params.username+'/posts',
    children: [
      {
        path: '/user/:username/posts',
        name: 'Posts',
        component: PostArticles,
      },
      {
        path: '/user/:username/comments',
        name: 'Comments',
        component: PostComments,
      },
      {
        path: '/user/:username/followers',
        name: 'Followers',
        component: Followers,
      },
      {
        path: '/user/:username/followings',
        name: 'Following',
        component: Followings,
      },
      {
        path: '/user/:username/cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: '/user/:username/bought',
        name: 'bought',
        component: Bought,
      },
      {
        path: '/user/:username/edit-info',
        name: 'editInfo',
        component: EditInfo,
      },
      {
        path: '/user/:username/change-password',
        name: 'changePassword',
        component: ChangePassword,
      },
    ]
  },
  {
    path: '/topic/:topicId',
    name: 'TopicId',
    component: Topic
  },
  {
    path: '/admin/',
    name: 'Admin',
    component: () => import('@/views/admin/Admin'),
    redirect: '/admin/login/',
    children: [
      {
        path: '/admin/login',
        name: 'AdminLogin',
        component: () => import('@/views/admin/Login')
      },
      {
        path: '/admin/manage',
        name: 'AdminManage',
        component: () => import('@/views/admin/Manage')
      }
    ]
  },


  // {
  //   path: '/mall/good/:id',
  //   name: 'Good',
  //   component: Good,
  // },

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})


export default router
