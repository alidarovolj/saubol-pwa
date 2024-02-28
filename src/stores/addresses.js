import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useAddressesStore = defineStore('addresses', () => {

    const resultAddresses = ref(null);
    const resultCreate = ref(null);

    return {
        resultAddresses,
        resultCreate,
        listAddresses() {
            axios.get(`/users/addresses`)
                .then(response => {
                    if (response.status === 200) {
                        resultAddresses.value = response.data
                    } else {
                        resultAddresses.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultAddresses.value = false
                });
        },

        createAddress(form) {
            axios.post(`/users/addresses`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultCreate.value = response.data
                    } else {
                        resultCreate.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultCreate.value = false
                });
        },
    }
})