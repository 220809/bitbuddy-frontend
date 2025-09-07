import Index from "../pages/Index.vue";
import Group from "../pages/Group.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import BasicLayout from "../layouts/BasicLayout.vue";


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
    // { path: '/group', component: Group },
    // { path: '/user', component: User },
    { path: '/search', component: Search },
    { path: '/user/edit', component: UserEdit },
]

export default routes;