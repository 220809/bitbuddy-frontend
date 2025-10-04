<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import appAxios from "../plugins/appAxios.ts";
import defaultIcon from "../assets/default_group.png";
import {groupAccessLevelEnum} from "../constants/group/groupAccessLevel.ts";
import {getCurrentUser} from "../services/user.ts";
import {showFailToast, showSuccessToast} from "vant";
import qs from "querystring"

const route = useRoute();
const router = useRouter();
const group = ref<Group>();
const currentUser = ref();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
  const res = await appAxios.get("/group/details", {
    params: {
      groupId: route.query.id,
    }
  });
  if (res?.code === 200) {
    group.value = res.data;
    console.log('请求成功');
    return;
  }
  console.log('请求失败');
})

const doQuitGroup = async (id: number) => {
  const res = await appAxios.post("/group/quit", qs.stringify({groupId: id}));
  if (res?.code === 200) {
    showSuccessToast('退出圈子成功');
    router.back();
    return;
  }
  showFailToast('退出圈子失败');
}

const doDismissGroup = async (id: number) => {
  const res = await appAxios.post("/group/dismiss", qs.stringify({groupId: id}));
  if (res?.code === 200) {
    showSuccessToast('解散圈子成功');
    router.back();
    return;
  }
  showFailToast('解散圈子失败');
}

const updateGroup = async (id: number) => {
  router.push({
    path: '/group/update',
    query: {
      id,
    }
  })
}
</script>

<template>
  <van-card
      v-if="group"
      :desc="group.description"
      :title="group.name"
      :thumb="defaultIcon"
  >
    <template #tags>
      <van-space wrap>
        <van-tag plain type="primary">{{ groupAccessLevelEnum[group.accessLevel] }}</van-tag>
        <van-tag type="primary" v-if="group.leader.userId === currentUser?.userId">队长</van-tag>
      </van-space>
    </template>
    <template #bottom>
      {{`人数: ${group.maxCapacity}`}}<br/>
      {{`创建时间: ${group.createTime}`}}
    </template>
    <template #footer>
      <van-button type="primary" size="mini"
                  :disabled="group.leader.userId !== currentUser?.userId"
                  @click="updateGroup(group.id)">修改圈子</van-button>
      <van-button type="warning" size="mini" @click="doQuitGroup(group.id)">退出圈子</van-button>
      <van-button type="danger" size="mini"
                  :disabled="group.leader.userId !== currentUser?.userId"
                  @click="doDismissGroup(group.id)">解散圈子</van-button>
    </template>
  </van-card>
  <van-empty v-else>未获取到圈子信息</van-empty>
</template>

<style scoped>
:deep(.van-button--disabled) {
  background-color: gray;
  border: 0;
}
</style>