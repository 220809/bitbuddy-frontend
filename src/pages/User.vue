<script setup lang="ts">
import {useRouter} from "vue-router";

const user: User = {
  userId: 123,
  username: 'dingzi',
  email: '123456@qq.com',
  userAccount: 'dingzi',
  avatarUrl: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg',
  tags: '',
  gender: 1,
  status: 1,
  createdAt: new Date,
  userRole: 0,
}
const router = useRouter();
const onEdit = (key: string, value: string) => {
  router.push(
      {
        path: '/user/edit',
        query: {
          userPropKey: key,
          currentValue: value,
        }
      }
  )
}
</script>

<template>
  <van-cell-group inset>
    <van-cell title="用户名" :value="user.username" is-link @click="onEdit('用户名', user.username)"/>
    <van-cell title="邮箱" :value="user.email" is-link @click="onEdit('邮箱', user.email)"/>
    <van-cell title="账户" :value="user.userAccount" />
    <van-cell title="头像" is-link>
      <van-image
          round
          fit="cover"
          width="2rem"
          height="2rem"
          :src="user.avatarUrl"
      />
    </van-cell>
    <van-cell title="标签" :value="user.tags" is-link/>
    <van-cell title="性别" :value="user.gender === 1 ? '男' : '女'" is-link @click="onEdit('性别', user.gender === 1 ? '男' : '女')"/>
    <van-cell title="注册日期" :value="user.createdAt.toLocaleString()" />
  </van-cell-group>
</template>

<style scoped>

</style>