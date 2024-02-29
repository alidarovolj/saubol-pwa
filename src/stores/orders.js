import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useOrdersStore = defineStore('orders', () => {
    const result = ref(null);
    const resultDetails = ref(null);
    const resultAccept = ref(null);
    const resultComplete = ref(null);

    return {
        result,
        resultDetails,
        resultAccept,
        resultComplete,
        listOrders(params) {
            axios.get(`/doctors/my-orders`, { params })
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

        orderDetails(id) {
            axios.get(`/orders/staff-orders/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        resultDetails.value = response.data
                    } else {
                        resultDetails.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultDetails.value = false
                });
        },

        acceptOrder(id) {
            axios.put(`/doctors/${id}/accept`)
                .then(response => {
                    if (response.status === 200) {
                        resultAccept.value = response.data
                    } else {
                        resultAccept.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultAccept.value = false
                });
        },

        completeOrder(id) {
            axios.put(`/doctors/${id}/complete`)
                .then(response => {
                    if (response.status === 200) {
                        resultComplete.value = response.data
                    } else {
                        resultComplete.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultComplete.value = false
                });
        }
    }
})