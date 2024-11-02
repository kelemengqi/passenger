<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-10-31 08:30:52
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-02 15:50:00
 * @FilePath: /passenger/passenger-vue/passenger-app/src/views/PassengerListView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <h1>Passenger List</h1>
  <ul v-if="passengers.length">
    <li v-for="passenger in passengers" :key="passenger._id">
      <RouterLink :to="{ name: 'passenger-detail', params: { id: passenger._id } }">
        {{ passenger.name }}
      </RouterLink>
    </li>
  </ul>
  <p v-else>Loading passengers...</p> <!-- 当没有乘客时显示加载提示 -->
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';
import nProgress from 'nprogress'; // 导入 NProgress

interface Passenger {
  _id: string;
  name: string;
}

const passengers = ref<Passenger[]>([]);

onMounted(async () => {
  nProgress.start(); // 启动进度条
  try {
    const response = await axios.get<{ data: Passenger[] }>('https://api.instantwebtools.net/v1/passenger');
    passengers.value = response.data.data; // 设置乘客数据
  } catch (error) {
    console.error('获取乘客数据时出错:', error);
  } finally {
    nProgress.done(); // 完成进度条
  }
});
</script>
