<script setup lang="ts">
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import appAxios from "../plugins/appAxios.ts";
import GroupCardList from "../components/GroupCardList.vue";

const value = ref('');
const router = useRouter();
const joinedGroups = ref([]);

const onSearch = (value: string) => {
  console.log(value)
}

const doCreateGroup = () => {
  router.push("/group/create");
}

onMounted(async () => {
  const res = await appAxios.get("/group/joined");
  if (res?.code === 200) {
    joinedGroups.value = res.data;
    console.log('请求成功');
    return;
  }
  console.log('请求失败');
})
</script>

<template>
  <form action="/">
    <van-search
        v-model="value"
        shape="round"
        show-action
        placeholder="请输入搜索关键字"
        @search="onSearch(value)"
    >
      <template #left>
        <van-icon name="arrow-left" @click="router.back()"/>
      </template>
      <template #action>
        <div @click="onSearch(value)">
          搜索
        </div>
      </template>
    </van-search>
  </form>
  <van-button type="primary" @click="doCreateGroup">创建圈子</van-button>
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    我加入的圈子
  </van-divider>
  <GroupCardList :group-list="joinedGroups" />
</template>

<style scoped>

</style>