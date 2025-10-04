<script setup lang="ts">
import defaultIcon from "../assets/default_group.png"
import {groupAccessLevelEnum} from "../constants/group/groupAccessLevel.ts";
import {getCurrentUser} from "../services/user.ts";
import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";

  interface UserCardListProps {
    groupList: Group[],
  }
  const props = defineProps<UserCardListProps>();
  const currentUser = ref();
  const router = useRouter();

  onMounted(async () => {
    currentUser.value = await getCurrentUser();
  })

const onGroupPanelClicked = (id: number) => {
    router.push({
      path: "/group/details",
      query: {
        id,
      }
    });
}
</script>

<template>
  <div id="groupList">
    <van-card
        v-for="group in props.groupList"
        :desc="group.description"
        :title="group.name"
        :thumb="defaultIcon"
        @click="onGroupPanelClicked(group.id)"
    >
      <template #tags>
        <van-space wrap>
          <van-tag plain type="primary">{{ groupAccessLevelEnum[group.accessLevel] }}</van-tag>
          <van-tag type="primary" v-if="group.leader.userId === currentUser?.userId">队长</van-tag>
        </van-space>
      </template>
      <template #bottom>
        {{`人数: ${group.maxCapacity}`}}
      </template>
    </van-card>
  </div>
  <van-empty v-if="!groupList || groupList.length < 1" description="你尚未加入任何队伍" />
</template>

<style scoped>
.van-card {
  --van-card-thumb-size: 80px;
  --van-card-background: #eee;
}
</style>