import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import ArticleCard from "../views/article/ArticleCard";
import Sidebar from "../components/Sidebar";
import ArticleEditor from "../components/editor/index"
import NewArticle from "../views/article/NewArticle"

const routes = [
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
  // {
  //   path: 'user/:username/',
  //   name: 'User',
  //   component: User,
  //   children: [
  //     {
  //       path: 'posts',
  //       name: 'Posts',
  //       component: Posts,
  //     },
  //     {
  //       path: 'followers',
  //       name: 'Followers',
  //       component: Posts,
  //     },
  //     {
  //       path: 'following',
  //       name: 'Following',
  //       component: Following,
  //     },
  //     {
  //       path: 'cart',
  //       name: 'Cart',
  //       component: Cart,
  //     },
  //     {
  //       path: 'bought',
  //       name: 'bought',
  //       component: Bought,
  //     },
  //     {
  //       path: 'eidt',
  //       name: 'edit',
  //       component: Edit,
  //     },
  //   ]
  // },
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
  // {
  //   path:'wiki',
  //   name:'Wiki',
  //   component:WikiItem,
  // },
  // {
  //   path: 'wiki/:id',
  //   name: 'Wiki-item',
  //   component: WikiItem,
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
