const Home = () => import('@/views/Home'); //首页 
const Login = () => import('@/views/Login'); //登录页面
const UserCenter = () => import('@/views/UserCenter'); //用户中心页面
const Topic = () => import('@/views/Topic') //课题页面
const SelectedTopic = () => import('@/views/StuViews/SelectedTopic') //已经选课题

const NotFound = () => import('@/views/NotFound') //没有找到页面

const routes = [{
    name: 'home',
    path: '/',
    component: Home,
    meta: {
      requiresAuth: true,
      roles: [1,2,3]
    },
  },
  {
    name: 'login',
    path: '/login',
    component: Login,
    meta: {
      hideMenu: true,
      requiresAuth: false,
    },
  },
  {
    name: 'userc',
    path: '/userc',
    component: UserCenter,
    meta: {
      requiresAuth: true,
    }
  },
  {
    name: 'topic',
    path: '/topic',
    component: Topic,
    meta: {
      requiresAuth: true,
      roles: [1,2,3]
    }
  },
  {
    name: 'stu',
    path: '/stu',
    children: [
      {
        name: 'selectedTopic',
        path: 'selectedTopic',
        component: SelectedTopic,
        meta: {
          requiresAuth: true,
          roles: [3],
        },
      }
    ],
    meta: {
      requiresAuth: true,
      roles: [3],
    },
  },
  {
    name: 'admin',
    path: '/admin',
    children: [
      
    ],
    meta: {
      requiresAuth: true,
      roles: [1],
    },
  },
  {
    name: 'tea',
    path: '/tea',
    children: [
      
    ],
    meta: {
      requiresAuth: true,
      roles: [2],
    },
  },
  {
    name: 'dir',
    path: '/dir',
    children: [
      
    ],
    meta: {
      requiresAuth: true,
      roles: ['DIR'],
    },
  },
  {
    name: 'notfound',
    path: '/notfound',
    component: NotFound,
    meta: {
      requiresAuth: false,
      roles: ['*'],
    },
  }
];

export default routes;