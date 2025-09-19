<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";
import User from "./User.vue";

let user = ref<User>();

const router = useRouter();
const onEdit = (key: string, name: string, value: string | number) => {
  router.push(
      {
        path: '/user/edit',
        query: {
          userPropKey: key,
          userPropName: name,
          currentValue: value,
        }
      }
  )
}

onMounted(async () => {
  const currentUser = await getCurrentUser();

  if (currentUser) {
    showSuccessToast("获取用户信息成功");
    user.value = currentUser;
  } else {
    showFailToast("获取用户信息失败");
  }
})
</script>

<template>
  <van-cell-group inset v-if="user">
    <van-cell title="用户名" title-class="custom-cell-title" :value="user.username" is-link @click="onEdit('username', '用户名', user.username)"/>
    <van-cell title="签名" title-class="custom-cell-title" is-link @click="onEdit('slogan', '签名', user.slogan)">
      <template #value>
        <van-text-ellipsis :content="user.slogan" />
      </template>
    </van-cell>
    <van-cell title="邮箱" title-class="custom-cell-title" :value="user.email" is-link @click="onEdit('email', '邮箱', user.email)"/>
    <van-cell title="账户" :value="user.userAccount" />
    <van-cell title="头像"  is-link>
      <van-image
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="user.avatarUrl"
      />
    </van-cell>
    <van-cell title="标签" is-link title-class="custom-cell-title">
      <template #value>
        <van-space wrap>
          <van-tag plain type="primary" v-for="tag in user.tags">{{ tag }}</van-tag>
        </van-space>
      </template>
    </van-cell>
    <van-cell title="性别" :value="user.gender === 1 ? '男' : '女'" is-link @click="onEdit('gender', '性别', user.gender)"/>
    <van-cell title="注册日期" title-class="custom-cell-title" :value="user.createdAt.toLocaleString()"/>
  </van-cell-group>
</template>

<style scoped>
  :deep(.custom-cell-title) {
    flex: 0 0 auto;
    margin-right: 10px;
  }
</style>