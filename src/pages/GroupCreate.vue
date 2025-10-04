<script setup lang="ts">
import {ref} from "vue";
import appAxios from "../plugins/appAxios.ts";
import {useRouter} from "vue-router";

const router = useRouter();

const initGroupInfo = {
  "name": "",
  "description": "",
  "maxCapacity": 2,
  "accessLevel": 0,
  "password": ""
}

const groupInfo = ref({...initGroupInfo});

const onCreateGroup = () => {
  appAxios.post("/group/create", groupInfo.value);
  router.replace('/group');
}
</script>

<template>
  <van-form @submit="onCreateGroup">
    <van-cell-group inset>
      <van-field
          v-model="groupInfo.name"
          name="name"
          label="圈子名称"
          placeholder="请输入圈子名称"
          :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
          v-model="groupInfo.description"
          name="description"
          rows="2"
          autosize
          label="圈子描述"
          type="textarea"
          maxlength="100"
          placeholder="请输入圈子描述"
          show-word-limit
      />
      <van-field name="maxCapacity" label="最大人数">
        <template #input>
          <van-stepper v-model="groupInfo.maxCapacity" max="20" min="2"/>
        </template>
      </van-field>
      <van-field name="radio" label="访问等级">
        <template #input>
          <van-radio-group v-model="groupInfo.accessLevel" direction="horizontal">
            <van-radio name="0" :checked="Number(groupInfo.accessLevel) === 0">公开</van-radio>
            <van-radio name="1">私有</van-radio>
            <van-radio name="2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="Number(groupInfo.accessLevel) === 2"
          v-model="groupInfo.password"
          type="text"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        创建圈子
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>