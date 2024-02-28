import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useNewsStore = defineStore('news', () => {
    const result = ref(null);
    const resultDetail = ref(null);

    return {
        result,
        resultDetail,
        newsList() {
            axios.get(`/news`)
                .then(response => {
                    if (response.status === 200) {
                        const formatDate = (dateString) => {
                            const date = new Date(dateString);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                            const year = date.getFullYear();

                            return `${day}.${month}.${year}`;
                        }
                        for (let i = 0; i < response.data.data.length; i++) {
                            response.data.data[i].created_at = formatDate(response.data.data[i].created_at);
                        }
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

        detailNews(slug) {
            axios.get(`/news/slug/` + slug)
                .then(response => {
                    if (response.status === 200) {
                        const formatDate = (dateString) => {
                            const date = new Date(dateString);
                            const day = String(date.getDate()).padStart(2, '0');
                            const month = String(date.getMonth() + 1).padStart(2, '0'); // January is 0!
                            const year = date.getFullYear();

                            return `${day}.${month}.${year}`;
                        }
                        resultDetail.value = response.data
                        resultDetail.value.created_at = formatDate(response.data.created_at);
                    } else {
                        resultDetail.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultDetail.value = false
                });
        }
    }
})