<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import appAxios from "../plugins/appAxios.ts";
import {showFailToast, showToast} from "vant";
import UserCardList from "../components/userCardList.vue";

const route = useRoute();
const router = useRouter();
const userList = ref<User[]>([]);

onMounted(async () => {
  const userResultList = await appAxios.get('/user/search/tags', {
    params: {
      tagNameList: route.query.tags
    }
  })
      .then(res => {
        showToast('请求成功')
        return res.data;
      })
      .catch(err => {
        showFailToast('请求失败')
        console.log(err)
      })
  if (userResultList) {
    // 将后端标签字符串转换为数组形式
    const users = userResultList.map(item => {
      const user: User = item;
      user.tags = JSON.parse(item.tags);
      return user;
    })
    userList.value = users;
  }
})

</script>
<template>
  <van-nav-bar>
    <template #left>
      <van-icon name="arrow-left" @click="router.back()" />
    </template>
    <template #title> 搜索结果 </template>
  </van-nav-bar>
  <user-card-list :user-list="userList"/>
</template>

<style scoped>
</style>