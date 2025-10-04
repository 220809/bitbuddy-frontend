<script setup lang="ts">
import {onMounted, ref} from "vue";
import appAxios from "../plugins/appAxios.ts";
import {useRoute, useRouter} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();

const groupInfo = ref<Group>();
const password = ref<string>();

const doUpdateGroup = async () => {
  const res = await appAxios.post("/group/update", {
    id: groupInfo.value?.id,
    name: groupInfo.value?.name,
    description: groupInfo.value?.description,
    accessLevel: groupInfo.value?.accessLevel,
    password: password.value,
  });
  if (res?.code === 200) {
    showSuccessToast('更新圈子成功')
  } else {
    showFailToast('更新圈子失败')
  }
  await router.replace('/group');
}

onMounted(async () => {
  const res = await appAxios.get('/group/details', {
    params: {
      groupId: route.query.id,
    }
  });

  if (res?.code === 200) {
    groupInfo.value = res.data;
    return;
  }
  showFailToast('获取圈子信息失败');
})
</script>

<template>
  <van-form @submit="doUpdateGroup" v-if="groupInfo">
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
      <van-field name="radio" label="访问等级">
        <template #input>
          <van-radio-group v-model="groupInfo.accessLevel" direction="horizontal">
            <van-radio name="0" :checked="Number(groupInfo.accessLevel) === 0">公开</van-radio>
            <van-radio name="1" :checked="Number(groupInfo.accessLevel) === 1">私有</van-radio>
            <van-radio name="2" :checked="Number(groupInfo.accessLevel) === 2">加密</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
          v-if="Number(groupInfo.accessLevel) === 2"
          v-model="password"
          type="text"
          name="密码"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交修改
      </van-button>
    </div>
  </van-form>
</template>

<style scoped>

</style>