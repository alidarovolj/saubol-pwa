import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useJobsStore = defineStore('jobs', () => {
    const result = ref(null);

    return {
        result,
        jobsList() {
            axios.get(`/job-places`)
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
        }
    }
})