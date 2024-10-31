<template>
    <div v-if="airline">
      <h2>{{ airline.name }}</h2>
      <p>Country: {{ airline.country }}</p>
      <p>
        Website: 
        <a :href="airline.website" target="_blank">{{ airline.website }}</a>
      </p>
    </div>
    <div v-else>
      <p>Loading airline details...</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  
  // 定义 Airline 接口
  interface Airline {
    _id: string;
    name: string;
    country: string;
    website: string;
  }
  
  // 使用 Airline 类型指定 airline 的类型
  const airline = ref<Airline | null>(null);
  const route = useRoute();
  
  onMounted(async () => {
    try {
      const response = await axios.get<Airline>(`https://api.instantwebtools.net/v1/airlines/${route.params.id}`);
      airline.value = response.data;
    } catch (error) {
      console.error('Error fetching airline details:', error);
    }
  });
  </script>
  