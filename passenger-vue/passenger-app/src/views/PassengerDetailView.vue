<template>
  <div v-if="passenger" class="p-6">
    <h2 class="text-3xl font-bold text-blue-600">{{ passenger.name }}</h2>
    <p class="mt-4">
      Airline: 
      <RouterLink :to="{ name: 'airline-detail', params: { id: passenger.airline[0]._id } }" class="text-blue-500 hover:text-blue-700">
        {{ passenger.airline[0].name }}
      </RouterLink>
    </p>
    <p class="mt-2">ID: {{ passenger._id }}</p>
    <button @click="editPassenger" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Edit Passenger
    </button>
    <p v-if="flashMessage" class="mt-4 text-green-500">{{
      flashMessage
    }}</p>
  </div>
  <div v-else class="p-6">
    <p>Loading passenger details...</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';

interface Airline {
  _id: string;
  name: string;
}

interface Passenger {
  _id: string;
  name: string;
  airline: Airline[];
}

const passenger = ref<Passenger | null>(null);
const route = useRoute();
const router = useRouter();
const flashMessage = ref<string | null>(null);

const editPassenger = async () => {
  flashMessage.value = 'Updating passenger details...';
  setTimeout(() => {
    flashMessage.value = null;
    router.push({ name: 'passenger-list' });
  }, 5000);
};

onMounted(async () => {
  try {
    const response = await axios.get<Passenger>(`https://api.instantwebtools.net/v1/passenger/${route.params.id}`);
    passenger.value = response.data;
  } catch (error) {
    console.error('Error fetching passenger details:', error);
  }
});
</script>

<style scoped>
.flash {
  color: green;
  margin-top: 10px;
}
</style>
