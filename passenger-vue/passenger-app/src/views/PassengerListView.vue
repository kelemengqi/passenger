<template>
  <h1>Passenger List</h1>
  <ul v-if="currentPassengers.length">
    <li v-for="passenger in currentPassengers" :key="passenger._id">
      <RouterLink :to="{ name: 'passenger-detail', params: { id: passenger._id } }">
        {{ passenger.name }}
      </RouterLink>
    </li>
  </ul>
  <p v-else>Loading passengers...</p> <!-- 当没有乘客时显示加载提示 -->

  <div class="pagination">
    <button @click="prevPage" :disabled="page <= 1">Prev</button>
    <span>Page {{ page }} of {{ totalPages }}</span>
    <button @click="nextPage" :disabled="page >= totalPages">Next</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, defineProps } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import nProgress from 'nprogress';

interface Passenger {
  _id: string;
  name: string;
}

const props = defineProps<{
  page: number; // 接收当前页作为 prop
}>();

const passengers = ref<Passenger[]>([]);
const itemsPerPage = 5;
const router = useRouter();

const totalPages = computed(() => Math.ceil(passengers.value.length / itemsPerPage));

const currentPassengers = computed(() => {
  const start = (props.page - 1) * itemsPerPage;
  return passengers.value.slice(start, start + itemsPerPage);
});

onMounted(async () => {
  nProgress.start();
  try {
    const response = await axios.get<{ data: Passenger[] }>('https://api.instantwebtools.net/v1/passenger');
    passengers.value = response.data.data;
  } catch (error) {
    console.error('获取乘客数据时出错:', error);
  } finally {
    nProgress.done();
  }
});

// 分页方法
const nextPage = () => {
  if (props.page < totalPages.value) {
    router.push({ name: 'passenger-list', query: { page: props.page + 1 } });
  }
};

const prevPage = () => {
  if (props.page > 1) {
    router.push({ name: 'passenger-list', query: { page: props.page - 1 } });
  }
};
</script>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
}

button {
  margin: 0 5px;
}
</style>
