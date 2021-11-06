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
import Edit from "@/views/user/Edit"


const routes = [
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
    redirect: "/user/:username/posts",
    children: [
      {
        path: '/user/:username/posts',
        name: 'Posts',
        component: PostArticles,
      },
      {
        path: 'followers',
        name: 'Followers',
        component: Followers,
      },
      {
        path: 'following',
        name: 'Following',
        component: Followings,
      },
      {
        path: 'cart',
        name: 'Cart',
        component: Cart,
      },
      {
        path: 'bought',
        name: 'bought',
        component: Bought,
      },
      {
        path: 'eidt',
        name: 'edit',
        component: Edit,
      },
    ]
  },

  // {
  //   path: '/mall/good/:id',
  //   name: 'Good',
  //   component: Good,
  // },
  // {
  //   path: 'article/:id',
  //   name: 'Article',
  //   component: Article,
  // },

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
