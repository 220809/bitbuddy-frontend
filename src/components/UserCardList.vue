<script setup lang="ts">
  import User from "../pages/User.vue";

  interface UserCardListProps {
    userList: User[],
  }
  const props = defineProps<UserCardListProps>();
</script>

<template>
  <van-card
      v-for="user in props.userList"
      :desc="user.slogan"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-space wrap>
        <van-tag plain type="primary" v-for="tag in user.tags">{{ tag }}</van-tag>
      </van-space>
    </template>
  </van-card>
  <van-empty v-if="userList.length < 1" description="暂无数据" />
</template>

<style scoped>
.van-card {
  --van-card-thumb-size: 60px;
  --van-card-background: #eee;
  --van-card-title-line-height: 25px;
}
</style>