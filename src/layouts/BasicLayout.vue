<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from "vue-router";

const active = ref("home");
const onChange = (name: string) => { active.value = name;};

const router = useRouter();
const onSearchClick = () => router.push('/search');
</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-image
          round
          fit="cover"
          width="2rem"
          height="2rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      />
    </template>
    <template #right>
      <van-icon name="search" size="18" @click="onSearchClick"/>
    </template>
  </van-nav-bar>
  <div id="content">
    <router-view />
  </div>
  <van-tabbar @change="onChange" route>
    <van-tabbar-item icon="home-o" name="home" to="/index">主页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="group" to="/group">圈子</van-tabbar-item>
    <van-tabbar-item icon="contact-o" name="user" to="/user">我的</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>

</style>