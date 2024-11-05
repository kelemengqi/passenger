<template>
  <div class="p-6">
    <h1 class="text-2xl font-semibold text-blue-600 mb-4">Passenger List</h1>

    <!-- 乘客列表 -->
    <ul v-if="currentPassengers.length" class="space-y-4">
      <li v-for="passenger in currentPassengers" :key="passenger._id" class="border rounded-lg p-4 bg-gray-50 shadow-md hover:bg-gray-100">
        <RouterLink :to="{ name: 'passenger-detail', params: { id: passenger._id } }" class="text-lg text-blue-500 hover:text-blue-700">
          {{ passenger.name }}
        </RouterLink>
      </li>
    </ul>

    <p v-else class="text-gray-500">Loading passengers...</p>

    <!-- 分页按钮 -->
    <div v-if="totalPages > 1" class="flex justify-center items-center space-x-4 mt-6">
      <!-- 上一页按钮 -->
      <button
        @click="prevPage"
        :disabled="page <= 1"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600"
      >
        Prev
      </button>

      <span class="text-lg">Page {{ page }} of {{ totalPages }}</span>

      <!-- 下一页按钮 -->
      <button
        @click="nextPage"
        :disabled="page >= totalPages"
        class="px-4 py-2 bg-blue-500 text-white rounded-lg disabled:bg-gray-400 hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed,  } from 'vue';
import axios from 'axios';
import nProgress from 'nprogress';
import { useRoute, useRouter } from 'vue-router';

interface Passenger {
  _id: string;
  name: string;
}

const passengers = ref<Passenger[]>([]);
const itemsPerPage = 5; // 每页显示的乘客数量
const router = useRouter();
const route = useRoute();

// 当前页（从查询参数获取）
const page = computed(() => parseInt(route.query.page as string) || 1);

// 计算总页数
const totalPages = computed(() => Math.ceil(passengers.value.length / itemsPerPage));

// 计算当前页的乘客
const currentPassengers = computed(() => {
  const start = (page.value - 1) * itemsPerPage;
  return passengers.value.slice(start, start + itemsPerPage);
});

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

// 分页方法
const nextPage = () => {
  if (page.value < totalPages.value) {
    router.push({ name: 'passenger-list', query: { page: page.value + 1 } });
  }
};

const prevPage = () => {
  if (page.value > 1) {
    router.push({ name: 'passenger-list', query: { page: page.value - 1 } });
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
