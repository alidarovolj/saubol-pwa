import {defineStore} from "pinia";
import {ref} from "vue";
import axios from "@/utils/axios.js";

export const useUserStore = defineStore('user', () => {
    const result = ref(null);
    const resultLogout = ref(null);
    const resultImage = ref(null);
    const resultUpdate = ref(null);

    return {
        result,
        resultLogout,
        resultImage,
        resultUpdate,
        async getProfile() {
            await axios.get(`/auth/me`)
                .then(response => {
                    if (response.data) {
                        // Create two arrays: one for documents and one for certificates
                        const diploma = response.data.data.staff.documents.filter(doc => doc.type === 'diploma');
                        const certificates = response.data.data.staff.documents.filter(doc => doc.type === 'certificate');

                        // Add these arrays to data.value
                        response.data.diploma = diploma;
                        response.data.certificates = certificates;

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

        async logoutProfile() {
            await axios.post(`/auth/logout`)
                .then(response => {
                    if (response.status === 200) {
                        resultLogout.value = response.data
                    } else {
                        resultLogout.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultLogout.value = false
                });
        },

        async setImage(file) {
            const formData = new FormData();
            formData.append('img', file);

            await axios.post(`/users/set-img`, formData)
                .then(response => {
                    if (response.status === 200) {
                        resultImage.value = response.data
                    } else {
                        resultImage.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultImage.value = false
                });
        },

        async updateProfile(form) {
            await axios.put(`/users/profile`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultUpdate.value = response.data
                    } else {
                        resultUpdate.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultUpdate.value = false
                });
        }
    }
})