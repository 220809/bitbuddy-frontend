<script setup lang="ts">
import {onMounted, ref} from "vue";
import appAxios from "../plugins/appAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import UserCardList from "../components/userCardList.vue";

const userList = ref<User[]>([]);

onMounted(async () => {
  const userResultList = await appAxios.get('/user/recommend')
      .then(res => {
        showSuccessToast('请求成功')
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
  <user-card-list :user-list="userList" />
</template>

<style scoped>

</style>