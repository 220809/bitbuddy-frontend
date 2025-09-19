import appAxios from "../plugins/appAxios.ts";
import {showFailToast} from "vant";

export const getCurrentUser = async () => {

    const res: any = await appAxios.get('/user/current');
    if (res.code === 200) {
        const user: User = res.data;
        user.tags = JSON.parse(res.data.tags);

        return user;
    }
    showFailToast('请先登录');
    return null;
}