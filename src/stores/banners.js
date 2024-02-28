import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useBannersStore = defineStore('banners', () => {

    const result = ref(null);

    return {
        result,
        listBanners() {
            axios.get(`/admin/banners`)
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
    }
})