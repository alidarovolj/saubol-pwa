import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useDomoLabStore = defineStore('domolab', () => {
    const result = ref(null);
    const resultCreate = ref(null);

    return {
        result,
        resultCreate,
        listDomolab() {
            axios.get(`/domo-lab`)
                .then(response => {
                    if (response.status === 200) {
                        result.value = response.data
                    } else {
                        result.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    result.value = false
                });
        },

        createLab(form) {
            axios.post(`/orders/domo-lab`, form)
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