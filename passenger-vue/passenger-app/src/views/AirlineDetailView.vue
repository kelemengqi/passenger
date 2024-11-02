<!--
 * @Author: kelemengqi 1565916105@qq.com
 * @Date: 2024-10-31 19:35:28
 * @LastEditors: kelemengqi 1565916105@qq.com
 * @LastEditTime: 2024-11-02 14:31:20
 * @FilePath: /passenger/passenger-vue/passenger-app/src/views/AirlineDetailView.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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

interface Airline {
  _id: string;
  name: string;
  country: string;
  website: string;
}

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
