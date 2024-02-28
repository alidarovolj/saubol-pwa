<script setup>
import {YandexMap} from 'vue-yandex-maps'
import axios from 'axios';
import {useAddressesStore} from "@/stores/addresses.js";
import {storeToRefs} from "pinia";
import {ref, nextTick} from "vue";

const coordinates = ref([43.2567, 76.9286]);
const controls = ['fullscreenControl'];
const zoomData = ref(13);

const addresses = useAddressesStore()
const {resultCreate} = storeToRefs(addresses)

const detailedControls = {zoomControl: {position: {right: 10, top: 50}}};
let searchQuery = '';
const suggestions = ref([]);
const done_address = ref(false);
const parsedCoordinates = ref(null);

const form = ref({
  title: null,
  location: null
})

const API_KEY = '22c55307-cd6b-4d77-a94b-ab90bbfd4cb0';

const searchAddress = async () => {
  done_address.value = false;
  if (searchQuery.length > 2) {
    const response = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${API_KEY}&geocode=${searchQuery}`);
    suggestions.value = response.data.response.GeoObjectCollection.featureMember;
  } else {
    suggestions.value = [];
  }
}

const setAddress = async (pos, address) => {
  let coords = pos.split(" ");
  parsedCoordinates.value = pos;
  coordinates.value = [parseFloat(coords[1]), parseFloat(coords[0])];
  form.value.location = coordinates.value;
  form.value.title = address;
  zoomData.value = 15
  done_address.value = true;
}

const onClick = async (e) => {
  console.log(e)
  parsedCoordinates.value = e.get('coords');
  coordinates.value = e.get('coords');
  form.value.location = coordinates.value;
  zoomData.value = 19
  const response = await axios.get(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${API_KEY}&geocode=${coordinates.value[1]},${coordinates.value[0]}`);
  const details = response.data.response.GeoObjectCollection.featureMember[0].GeoObject;
  form.value.title = details.name;
  searchQuery = details.name;
  done_address.value = true;
}

const sendForm = async () => {
  await nextTick()
  await addresses.createAddress(form.value)
  if (resultCreate !== false) {
    create_address.close()
  } else {
  }
  await addresses.listAddresses()
}
</script>

<template>
  <dialog
      id="create_address"
      class="modal">
    <form @submit.prevent="sendForm" class="modal-box">
      <form method="dialog">
        <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
      </form>
      <h3 class="font-bold text-xl mb-5">
        Добавление адреса
      </h3>
      <div class="relative">
        <input
            class="p-3 border mb-3 w-full rounded-lg"
            type="text"
            v-model="searchQuery"
            @input="searchAddress"
            placeholder="Введите адрес">
        <div
            v-if="!done_address"
            class="absolute top-full left-0 w-full bg-white z-20 shadow rounded-lg">
          <p
              v-for="(suggestion, index) in suggestions"
              class="cursor-pointer text-xs px-3 py-2 hover:bg-gray-100 rounded-lg"
              @click="setAddress(suggestion.GeoObject.Point.pos, suggestion.GeoObject.description + ', ' + suggestion.GeoObject.name)"
              :key="index">
            {{ suggestion.GeoObject.description }}, {{ suggestion.GeoObject.name }}
          </p>
        </div>
      </div>
      <YandexMap
          @click="onClick"
          :coordinates="coordinates"
          :detailed-controls="detailedControls"
          :controls="controls"
          :zoom="zoomData"
          map-type="map"
      >
        <YandexMarker
            :coordinates="coordinates"
        />
      </YandexMap>
      <div class="flex justify-end mt-5">
        <button
            type="submit"
            :disabled="form.location === null || form.title === null"
            :class="{ 'bg-gray-300 cursor-not-allowed' : form.location === null || form.title === null }"
            class="bg-mainColor text-center text-white py-3 px-16 rounded-md">
          Добавить
        </button>
      </div>
    </form>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>
</template>

<style>
.yandex-container {
  height: 400px;
}
</style>