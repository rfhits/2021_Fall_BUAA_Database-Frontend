import {createRouter, createWebHistory} from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'
import Login from "../views/Login";
import Register from "../views/Register";
import ArticleCard from "@/components/ArticleCard";
import ArticleEditor from "../components/editor/index"
import NewArticle from "../views/article/NewArticle"
import ArticleDetail from "../views/article/ArticleDetail"
import User from "../views/user/User"
import CommentCard from "@/components/ArticleCommentCard"
import PostComments from "@/views/user/PostComments"
import PostArticles from "@/views/user/PostArticles"
import Bought from "@/views/user/Bought"
import Cart from "@/views/user/Cart"
import Followers from "@/views/user/Followers"
import Followings from "@/views/user/Followings"
import ChangePassword from "@/views/user/ChangePassword"
import EditInfo from "@/views/user/EditInfo"
import Topic from '@/views/topic/Topic'
import Mall from '@/views/mall/Mall'


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
        meta: {
            title: "ArticleDetails",
            requiresLoggedIn: true,
        },
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
        path: '/search',
        name: 'Search',
        component: () => import('@/views/search/Search'),
        children: [
            {
                path: '/search/user/',
                name: 'SearchUser',
                component: () => import('@/views/search/User')
            },
            {
                path: '/search/article/',
                name: 'SearchArticle',
                component: () => import('@/views/search/Article')
            },
            {
                path: '/search/topic/',
                name: 'SearchTopic',
                component: () => import('@/views/search/Topic')
            },
            {
                path: '/search/good/',
                name: 'SearchGood',
                component: () => import('@/views/search/Good')
            }
        ]
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
                return '/user/' + params.username + '/posts'
            }
        },
        children: [
            {
                path: '/user/:username/posts',
                name: 'Posts',
                component: PostArticles,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/comments',
                name: 'Comments',
                component: PostComments,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/followers',
                name: 'Followers',
                component: Followers,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/followings',
                name: 'Following',
                component: Followings,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/cart',
                name: 'Cart',
                component: Cart,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/bought',
                name: 'bought',
                component: Bought,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/edit-info',
                name: 'editInfo',
                component: EditInfo,
                meta: {
                    noScroll: true,
                }
            },
            {
                path: '/user/:username/change-password',
                name: 'changePassword',
                component: ChangePassword,
                meta: {
                    noScroll: true,
                }
            },
        ]
    },
    {
        path: '/topic/:id',
        name: 'Topic',
        component: Topic
    },
    {
        path: '/admin/',
        name: 'Admin',
        component: () => import('@/views/admin/Admin'),
        redirect: '/admin/login',
        children: [
            {
                path: '/admin/login',
                name: 'AdminLogin',
                component: () => import('@/views/admin/Login')
            },
            {
                path: '/admin/register',
                name: 'AdminRegister',
                component: () => import('@/views/admin/Register')
            },
            {
                path: '/admin/manage',
                redirect: '/admin/manage/users',
                name: 'AdminManage',
                component: () => import('@/views/admin/manage/Manage'),
                children: [
                    {
                        path: '/admin/manage/articles',
                        name: 'ManageArticles',
                        component: () => import('@/views/admin/manage/Articles'),
                        meta: {
                            requiresLoggedIn: true,
                            userType: 1,
                        }
                    },
                    {
                        path: '/admin/manage/users',
                        name: 'ManageUsers',
                        component: () => import('@/views/admin/manage/Users'),
                        meta: {
                            requiresLoggedIn: true,
                            userType: 1,
                        }
                    },
                    {
                        path: '/admin/manage/goods',
                        name: 'ManageGoods',
                        component: () => import('@/views/admin/manage/Goods'),
                        meta: {
                            requiresLoggedIn: true,
                            userType: 1,
                        }
                    },
                ]
            }
        ]
    },
    {
      path: '/mall/',
      name: 'Mall',
      component: Mall
    },
    {
      path: '/mall/good/:id',
      name: 'Good',
      component: () => import('@/views/mall/Good'),
    },

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to,from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        if (to.meta.noScroll) {
            return 0;
        } else {
            return {x:0, y:0}
        }
    }
})

router.beforeEach((to, from, next) => {
    if (to.meta.noScroll) {
        // pass
    } else {
        window.scrollTo(0,0)
    }
    if (to.meta.requiresLoggedIn && !store.state.loggedIn) {
        if (to.meta.userType === 1) {
            next({
                path: '/admin/login',
            })
        } else {
            next({
                path: '/login',
                query: {
                    redirect: to.path
                }
            })
        }
    } else {
        next()
    }


})

export default router
