import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useNursesStore = defineStore('nurses', () => {
    const result = ref(null);
    const resultDetail = ref(null);
    const resultNurseCart = ref(null);

    const daysOfWeek = ["ВС", "ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ"];

    return {
        result,
        resultNurseCart,
        resultDetail,
        getNurses(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            axios.get(`/nurse/services/?${queryString}`)
                .then(data => {
                    if (data.status === 200) {
                        let dates = [];
                        for (let i = 0; i < 7; i++) {
                            let date = new Date();
                            date.setDate(date.getDate() + i);
                            let formattedDate = date.toISOString().split('T')[0];
                            let dayOfWeek = daysOfWeek[date.getDay()];
                            let dayNumber = String(date.getDate()).padStart(2, '0');
                            dates.push({
                                date: formattedDate,
                                day_of_week: dayOfWeek,
                                day_number: dayNumber
                            });
                        }
                        let times = [];
                        let time = new Date();
                        time.setHours(0, 0, 0, 0);

                        for (let i = 0; i < 48; i++) {
                            let hours = String(time.getHours()).padStart(2, '0');
                            let minutes = String(time.getMinutes()).padStart(2, '0');
                            times.push(`${hours}:${minutes}:00`); // append :00 for seconds
                            time.setMinutes(time.getMinutes() + 30);
                        }

                        result.value = data.data
                        for (let i = 0; i < result.value.data.length; i++) {
                            result.value.data[i].dates = dates;
                            result.value.data[i].times = times; // set the times array to each nurse
                        }
                    } else {
                        result.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    result.value = false
                });
        },

        getNurse(id) {
            axios.get(`/nurse/services/${id}`)
                .then(data => {
                    if (data.status === 200) {
                        let dates = [];
                        for (let i = 0; i < 7; i++) {
                            let date = new Date();
                            date.setDate(date.getDate() + i);
                            let formattedDate = date.toISOString().split('T')[0];
                            let dayOfWeek = daysOfWeek[date.getDay()];
                            let dayNumber = String(date.getDate()).padStart(2, '0');
                            dates.push({
                                date: formattedDate,
                                day_of_week: dayOfWeek,
                                day_number: dayNumber
                            });
                        }

                        let times = [];
                        let time = new Date();
                        time.setHours(0, 0, 0, 0);

                        for (let i = 0; i < 48; i++) {
                            let hours = String(time.getHours()).padStart(2, '0');
                            let minutes = String(time.getMinutes()).padStart(2, '0');
                            times.push(`${hours}:${minutes}:00`); // append :00 for seconds
                            time.setMinutes(time.getMinutes() + 30);
                        }

                        resultDetail.value = data.data;
                        resultDetail.value.dates = dates;
                        resultDetail.value.times = times;
                    } else {
                        resultDetail.value = false;
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultDetail.value = false
                });
        },

        cartNurses(form) {
            axios.post(`/orders/nurse`, form)
                .then(data => {
                    if (data.status === 200) {
                        resultNurseCart.value = data.data
                    } else {
                        resultNurseCart.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultNurseCart.value = false
                });
        }
    }
})