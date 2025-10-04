<script setup lang="ts">
import { ref } from 'vue'
import appAxios from "../plugins/appAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {refreshUserState} from "../services/user.ts";

const router = useRouter();
const userAccount = ref('');
const password = ref('');
const onSubmit = async () => {
  const res: any = await appAxios.post('/user/login', {
    userAccount: userAccount.value,
    password: password.value
  });

  if (res.code == 200) {
    showSuccessToast('登录成功');
    await refreshUserState();
    await router.replace('/');
  } else {
    showFailToast('登录失败');
  }
};
</script>

<template>
  <van-nav-bar>
    <template #title>
      用户登录
    </template>
  </van-nav-bar>

  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账号"
          placeholder="请输入账号"
          :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
          v-model="password"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
  </van-form>

</template>

<style scoped>

</style>