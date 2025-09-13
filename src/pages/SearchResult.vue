<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import appAxios from "../plugins/appAxios.ts";
import {showFailToast, showToast} from "vant";

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
        console.log(res);
        console.log('/user/search/tags success');
        showToast('请求成功')
        return res.data?.data;
      })
      .catch(err => {
        console.error('/user/search/tags error', err);
        showFailToast('请求失败')
      })
  if (userResultList) {
    // 将后端标签字符串转换为数组形式
    userResultList.forEach(user => {
      if (user.tags) {
        user.tags = JSON.parse(user.tags);
        console.log(user.tags);
      }
    })
    userList.value =  userResultList;
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
  <van-card
      v-for="user in userList"
      :desc="user.slogan"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-space>
        <van-tag plain type="primary" v-for="tag in user.tags">{{ tag }}</van-tag>
      </van-space>
    </template>
    <template #footer>
      <van-button size="mini">联系方式</van-button>
    </template>
  </van-card>
  <van-empty v-if="userList.length < 1" description="暂无数据" />
</template>

<style scoped>
  .van-card {
    --van-card-thumb-size: 44px;
    --van-card-background: #eee;
    --van-card-title-line-height: 20px;
  }
</style>