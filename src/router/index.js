import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Index from '../views/index.vue'
import storage from '@/utils/storage.js'

const routes = [{
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/contact.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/user',
    name: 'User',
    redirect: '/user/personal', //选定默认的子组件
    component: () => import('../views/user.vue'),
    children: [{
        path: 'personal',
        component: () => import('../components/user/personal/personal.vue'),
        children: [{
          path: 'changepsw',
          component: () => import('../components/common/changepsw.vue'),
        }],
      },
      {
        path: 'allmes',
        component: () => import('../components/user/allmes/allmes.vue'),
        redirect: '/user/allmes/message', //选定默认的子组件
        children: [{
            path: 'message/:id',
            component: () => import('../components/user/allmes/message.vue'),
          },
          {
            path: 'statistics',
            component: () => import('../components/user/allmes/statistics.vue'),
          }
        ]
      },
      {
        path: 'notice/:org',
        component: () => import('../components/user/notice/notice.vue'),
      },
      {
        path: 'attend',
        component: () => import('../components/user/attend/attend.vue'),
      },
    ]
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin.vue'),
    redirect: '/admin/personal', //选定默认的子组件
    children: [{
        path: 'personal',
        component: () => import('../components/admin/personal/personal.vue'),
      },
      {
        path: 'publish',
        component: () => import('../components/admin/publish/publish.vue'),
      },
      {
        path: 'enroll',
        component: () => import('../components/admin/enroll/enroll.vue'),
      },
      {
        path: 'manage',
        component: () => import('../components/admin/manage/manage.vue'),
      },
      {
        path: 'previous',
        component: () => import('../components/admin/previous/previous.vue'),
      },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

//全局守卫拦截
router.beforeEach((to,from,next)=>{
  let flag = storage.getExpire('login');//获取点击登录按钮时所设置的 sessionStorage
  if(to.path.includes('/user') || to.path.includes('/admin')){        //如果想要跳转home或者algsmanager页面必须判断有没有sessionStorage
    if(flag){              //如果有sessionStorage
      next();				//跳转
    }else {
      alert('您还没有登录，请先登录!');   //没有就先登录
      next('/login');							//还在登录页
    }
  }else{
    next();
  }
  if(to.path === '/login'){
    storage.clear();
  }
})


export default router