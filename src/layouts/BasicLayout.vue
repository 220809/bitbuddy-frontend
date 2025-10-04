<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {useRoute, useRouter} from "vue-router";
import {showFailToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const active = ref("home");
const onChange = (name: string) => { active.value = name;};

const user = ref<User>();

const router = useRouter();
const route = useRoute();
const navBarShownRoutes = ['/', '/index', '/user', '/group/create', '/group/details', '/group/update'];
const tabBarShownRoutes = ['/', '/index', '/user', '/group', '/group/details', '/group/update'];
const avatarShownRoutes = ['/', '/index', '/user'];
const pageNames = {
  '/': '主页',
  '/index': '主页',
  '/group': '圈子',
  '/user': '我的',
  '/group/create': '创建圈子',
  '/group/details': '圈子详情',
  '/group/update': '更新圈子'
}
const onSearchClick = () => router.push('/search');

onMounted(async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    user.value = currentUser;
  } else {
    showFailToast("请先登录");
    await router.replace('/user/login');
  }
})
</script>

<template>
  <van-nav-bar v-if="navBarShownRoutes.includes(route.path)">
    <template #left>
      <van-image
          v-if="avatarShownRoutes.includes(route.path)"
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="user?.avatarUrl"
      />
      <van-icon v-else name="arrow-left" size="18" @click="router.back()"/>
    </template>
    <template #title>
      {{ pageNames[route.path] }}
    </template>
    <template #right>
      <van-icon name="search" size="18" @click="onSearchClick"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />
  </div>
  <van-tabbar @change="onChange" route v-if="tabBarShownRoutes.includes(route.path)">
    <van-tabbar-item icon="home-o" name="home" to="/index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="group" to="/group">圈子</van-tabbar-item>
    <van-tabbar-item icon="contact-o" name="user" to="/user">我的</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>
  #content {
    margin-bottom: 50px;
  }
</style>