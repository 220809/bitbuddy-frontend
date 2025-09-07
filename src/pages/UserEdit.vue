<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";

const route = useRoute();
const router = useRouter();

const onSubmit = (values: any) => console.log(values);
</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-icon name="arrow-left" @click="router.back()" />
    </template>
    <template #title>
      修改{{ route.query.userPropKey }}
    </template>
  </van-nav-bar>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="route.query.currentValue"
          :name="route.query.userPropKey"
          :label="route.query.userPropKey"
          :placeholder="`请输入${route.query.userPropKey}`"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>