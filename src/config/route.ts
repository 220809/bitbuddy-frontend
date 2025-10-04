import Index from "../pages/Index.vue";
import Group from "../pages/Group.vue";
import User from "../pages/User.vue";
import Search from "../pages/Search.vue";
import UserEdit from "../pages/UserEdit.vue";
import SearchResult from "../pages/SearchResult.vue";
import UserLogin from "../pages/UserLogin.vue";
import GroupCreate from "../pages/GroupCreate.vue";
import GroupDetails from "../pages/GroupDetails.vue";
import GroupUpdate from "../pages/GroupUpdate.vue";

const routes = [
    {
        path: '/',
        redirect: "/index",
    },
    { path: '/index', component: Index },
    { path: '/user', component: User },
    { path: '/group', component: Group },
    { path: '/search', component: Search },
    { path: '/user/edit', component: UserEdit },
    { path: '/user/list', component: SearchResult },
    { path: '/user/login', component: UserLogin },
    { path: '/group/create', component: GroupCreate },
    { path: '/group/details', component: GroupDetails },
    { path: '/group/update', component: GroupUpdate },
]

export default routes;