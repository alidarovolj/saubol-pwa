import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useVerificationStore = defineStore('verification', () => {
    const result = ref(null);
    const resultValidation = ref(null);

    return {
        result,
        resultValidation,
        sendMessage(form) {
            axios.get(`/auth/send-message?phone_number=${form.phone_number}`)
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

        validatePhone(form) {
            axios.post(`/auth/validate-phone`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultValidation.value = response.data
                    } else {
                        resultValidation.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultValidation.value = false
                });
        }
    }
})