import appAxios from "../plugins/appAxios.ts";
import {showFailToast} from "vant";
import {getCurrentUserState, setCurrentUserState} from "../states/userState.ts";

export const getCurrentUser = async () => {

    const currentUser = getCurrentUserState();
    if (currentUser) {
        return currentUser;
    }

    const res: any = await appAxios.get('/user/current');
    if (res.code === 200) {
        const user: User = res.data;
        user.tags = JSON.parse(res.data.tags);

        setCurrentUserState(user);
        return user;
    }
    showFailToast('请先登录');
    return null;
}

export const refreshUserState = async () => {
    if (!getCurrentUserState())
        setCurrentUserState(undefined);
    await getCurrentUser();
}