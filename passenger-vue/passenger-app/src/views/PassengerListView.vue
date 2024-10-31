<template>
    <h1>Passenger List</h1>
    <ul>
      <li v-for="passenger in passengers" :key="passenger._id">
        <RouterLink :to="{ name: 'passenger-detail', params: { id: passenger._id } }">
          {{ passenger.name }}
        </RouterLink>
      </li>
    </ul>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  
  // 定义 Passenger 接口
  interface Passenger {
    _id: string;
    name: string;
  }
  
  // 指定 passengers 的类型为 Passenger 数组
  const passengers = ref<Passenger[]>([]);
  
  onMounted(async () => {
    try {
      const response = await axios.get<{ data: Passenger[] }>('https://api.instantwebtools.net/v1/passenger');
      passengers.value = response.data.data; // 设置乘客数据
    } catch (error) {
      console.error('获取乘客数据时出错:', error);
    }
  });
  </script>
  