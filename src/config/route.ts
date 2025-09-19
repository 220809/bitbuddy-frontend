import Index from "../pages/Index.vue";
import Group from "../pages/Group.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import BasicLayout from "../layouts/BasicLayout.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";

const routes = [
    {
        path: '/',
        component: BasicLayout,
        redirect: "/index",
        children: [
            {
                path: 'index',
                component: Index,
            },
            {
                path: 'user',
                component: User,
            },
            {
                path: 'group',
                component: Group,
            }
        ]
    },
    { path: '/search', component: Search },
    { path: '/user/edit', component: UserEdit },
    { path: '/user/list', component: SearchResult },
    { path: '/user/login', component: UserLogin },
]

export default routes;