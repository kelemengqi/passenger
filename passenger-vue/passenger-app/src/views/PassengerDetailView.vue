<template>
    <div v-if="passenger">
      <h2>{{ passenger.name }}</h2>
      <p>
        Airline: 
        <RouterLink :to="{ name: 'airline-detail', params: { id: passenger.airline[0]._id } }">
          {{ passenger.airline[0].name }}
        </RouterLink>
      </p>
      <p>ID: {{ passenger._id }}</p>
    </div>
    <div v-else>
      <p>Loading passenger details...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  // 定义 Passenger 和 Airline 接口
  interface Airline {
    _id: string;
    name: string;
  }
  
  interface Passenger {
    _id: string;
    name: string;
    airline: Airline[];
  }
  
  // 使用 Passenger 类型指定 passenger 的类型
  const passenger = ref<Passenger | null>(null);
  const route = useRoute();
  
  onMounted(async () => {
    try {
      const response = await axios.get<Passenger>(`https://api.instantwebtools.net/v1/passenger/${route.params.id}`);
      passenger.value = response.data;
    } catch (error) {
      console.error('Error fetching passenger details:', error);
    }
  });
  </script>
  