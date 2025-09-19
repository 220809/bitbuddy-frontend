<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import appAxios from "../plugins/appAxios.ts";
import {showFailToast, showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const route = useRoute();
const router = useRouter();

const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  const res: any = await appAxios.post("/user/update", {
    'userId': currentUser?.userId,
    [route.query.userPropKey as string]: route.query.currentValue,
  });

  if (res.code === 200) {
    showSuccessToast('操作成功');
    router.back();
  } else {
    showFailToast('操作失败');
  }
}

const valueRequired = (value: string) => (value !== 'email' &&  value !== 'tags');

const onRadioClicked = (value: number) => {
  route.query.currentValue = value;
  console.log(route.query.currentValue)
}

</script>

<template>
  <van-nav-bar>
    <template #left>
      <van-icon name="arrow-left" @click="router.back()" />
    </template>
    <template #title>
      修改{{ route.query.userPropName }}
    </template>
  </van-nav-bar>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-if="route.query.userPropKey === 'gender'"
          v-model="route.query.currentValue as string"
          :name="route.query.userPropKey as string"
          :label="route.query.userPropName as string"
      >
        <template #input>
          <van-radio-group v-model="route.query.currentValue" direction="horizontal">
            <van-radio name="1" @click="onRadioClicked(1)">男</van-radio>
            <van-radio name="2" @click="onRadioClicked(2)">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-else
          v-model="route.query.currentValue as string"
          :name="route.query.userPropKey as string"
          :label="route.query.userPropName as string"
          :placeholder="`请输入${route.query.userPropName}`"
          :rules="[{ required: valueRequired(route.query.userPropKey as string), message: `请填写${route.query.userPropName}` }]"
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