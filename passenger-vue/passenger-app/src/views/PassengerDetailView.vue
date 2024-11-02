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
    <button @click="editPassenger">Edit Passenger</button>
    <p v-if="flashMessage" class="flash">{{ flashMessage }}</p>
  </div>
  <div v-else>
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
