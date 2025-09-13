<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";

const value = ref('');
const router = useRouter();

const initTagNameList: Tag[] = [
  {
    id: 1,
    name: 'Java',
  },
  {
    id: 2,
    name: 'Python',
  },
  {
    id: 3,
    name: 'C/C++',
  },
  {
    id: 4,
    name: '游戏',
  },
  {
    id: 5,
    name: 'Javascript'
  }
]

const tagNameList = ref<Tag[]>(initTagNameList)

const onSearch = (value: string) => {
  tagNameList.value = initTagNameList.filter(item => item.name.toLowerCase().includes(value.toLowerCase()));
}

const selectedTags = ref<Tag[]>([]);

const tagClicked = (item: Tag) => {
  if (!selectedTags.value.includes(item)) {
    selectedTags.value.push(item);
  }
};

const tagClosed = (item: Tag) => {
  selectedTags.value = selectedTags.value.filter(tag => tag.id !== item.id);
};

const doUserSearch = () => {
  const selectedTagNameList = selectedTags.value.map(tag => tag.name);
  router.push({
    path: '/user/list',
    query: {
      tags: selectedTagNameList,
    }
  })
}
</script>

<template>
  <form action="/">
    <van-search
        v-model="value"
        shape="round"
        show-action
        placeholder="请选择搜索标签"
        @search="onSearch(value)"
    >
      <template #left>
        <van-icon name="arrow-left" @click="router.back()"/>
      </template>
      <template #action>
        <div @click="onSearch(value)">
          搜索
        </div>
      </template>
    </van-search>
  </form>
  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
    已选标签
  </van-divider>

  <van-space wrap style="margin-left: 10px">
    <van-tag v-for="item in selectedTags" :key="item.id" closeable size="small" type="primary" @close="tagClosed(item)">
      {{ item.name }}
    </van-tag>
  </van-space>


  <van-divider
      :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }"
  >
      全部标签
  </van-divider>
  <van-space wrap style="margin-left: 10px">
    <van-tag v-for="item in tagNameList" :key="item.id" size="medium" type="primary"  @click="tagClicked(item)">
      {{ item.name }}
    </van-tag>
  </van-space>
  <div style="padding: 5px 16px">
    <van-button type="success" block @click="doUserSearch" size="large"> 搜索用户 </van-button>
  </div>

</template>

<style>

</style>