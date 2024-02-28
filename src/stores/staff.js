import {defineStore} from "pinia";
import axios from "@/utils/axios.js";
import {ref} from "vue";

export const useStaffStore = defineStore('staff', () => {
    const result = ref(null);
    const resultDetail = ref(null);
    const resultSpecs = ref(null);
    const resultSearch = ref(null);
    const resultRegister = ref(null);
    const resultDoc = ref(null);
    const resultOrderDoc = ref(null);
    const resultUpdate = ref(null);
    const resultUpdateSpec = ref(null);
    const resultChangedServices = ref(null);
    const resultChangedPassword = ref(null);
    const resultUpdatedJB = ref(null);
    const resultUpdatedSchedule = ref(null);

    return {
        result,
        resultDetail,
        resultSpecs,
        resultSearch,
        resultRegister,
        resultDoc,
        resultOrderDoc,
        resultUpdate,
        resultUpdateSpec,
        resultChangedServices,
        resultChangedPassword,
        resultUpdatedJB,
        resultUpdatedSchedule,
        getStaff(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            axios.get(`/staff/?${queryString}`)
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
        async updateStaff(form) {
            await axios.put(`/doctors/`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultUpdate.value = response.data
                        console.log(resultUpdate.value)
                    } else {
                        resultUpdate.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultUpdate.value = false
                });
        },
        async updateSpecStaff(form) {
            await axios.put(`/doctors/specialization-details`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultUpdateSpec.value = response.data
                    } else {
                        resultUpdateSpec.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultUpdateSpec.value = false
                });
        },
        async registerStaff(form) {
            await axios.post(`/staff/`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultRegister.value = response.data
                    } else {
                        resultRegister.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultRegister.value = false
                });
        },
        async getStaffDetail(id) {
            await axios.get(`/staff/` + id)
                .then(response => {
                    if (response.status === 200) {
                        let daysInRussian = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                        for (let j = 0; j < response.schedule.length; j++) {
                            let date = new Date(response.schedule[j].day);
                            let dayOfWeek = daysInRussian[date.getDay()];
                            let dayNumber = date.getDate().toString().padStart(2, '0'); // get the day of the month and pad it with 0 if needed
                            response.schedule[j].dayOfWeek = dayOfWeek;
                            response.schedule[j].dayNumber = dayNumber; // add the day number to the schedule object

                            for (let k = 0; k < response.schedule[j].times.length; k++) {
                                let timePeriods = [];

                                let start = new Date(`1970-01-01T${response.schedule[j].times[k].start}Z`);
                                let end = new Date(`1970-01-01T${response.schedule[j].times[k].end}Z`);
                                let duration = response.schedule[j].duration;

                                while (start < end) {
                                    let periodEnd = new Date(start.getTime() + duration * 60000);
                                    if (periodEnd > end) {
                                        break;
                                    }
                                    let startHours = start.getUTCHours().toString().padStart(2, '0');
                                    let startMinutes = start.getUTCMinutes().toString().padStart(2, '0');
                                    let startSeconds = start.getUTCSeconds().toString().padStart(2, '0');

                                    let endHours = periodEnd.getUTCHours().toString().padStart(2, '0');
                                    let endMinutes = periodEnd.getUTCMinutes().toString().padStart(2, '0');
                                    let endSeconds = periodEnd.getUTCSeconds().toString().padStart(2, '0');

                                    timePeriods.push({
                                        start: `${startHours}:${startMinutes}:${startSeconds}`,
                                        end: `${endHours}:${endMinutes}:${endSeconds}`
                                    });
                                    start = periodEnd;
                                }

                                response.schedule[j].times[k].timePeriods = timePeriods;
                            }
                        }
                        resultDetail.value = response.data
                    } else {
                        resultDetail.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultDetail.value = false
                });
        },
        async specializationList() {
            await axios.get(`/staff/specialization`)
                .then(response => {
                    if (response.status === 200) {
                        resultSpecs.value = response.data
                    } else {
                        resultSpecs.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultSpecs.value = false
                });
        },

        async searchStaff(queryParams = {}) {
            const queryString = new URLSearchParams(queryParams).toString();
            await axios.get(`/staff/search/?${queryString}`)
                .then(response => {
                    if (response.status === 200) {
                        let daysInRussian = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб']
                        for (let i = 0; i < response.data.length; i++) {
                            for (let j = 0; j < response.data[i].schedule.length; j++) {
                                let date = new Date(response.data[i].schedule[j].day);
                                let dayOfWeek = daysInRussian[date.getDay()];
                                let dayNumber = date.getDate().toString().padStart(2, '0'); // get the day of the month and pad it with 0 if needed
                                response.data[i].schedule[j].dayOfWeek = dayOfWeek;
                                response.data[i].schedule[j].dayNumber = dayNumber; // add the day number to the schedule object

                                for (let k = 0; k < response.data[i].schedule[j].times.length; k++) {
                                    let timePeriods = [];

                                    let start = new Date(`1970-01-01T${response.data[i].schedule[j].times[k].start}Z`);
                                    let end = new Date(`1970-01-01T${response.data[i].schedule[j].times[k].end}Z`);
                                    let duration = response.data[i].schedule[j].duration;

                                    while (start < end) {
                                        let periodEnd = new Date(start.getTime() + duration * 60000);
                                        if (periodEnd > end) {
                                            break;
                                        }
                                        let startHours = start.getUTCHours().toString().padStart(2, '0');
                                        let startMinutes = start.getUTCMinutes().toString().padStart(2, '0');
                                        let startSeconds = start.getUTCSeconds().toString().padStart(2, '0');

                                        let endHours = periodEnd.getUTCHours().toString().padStart(2, '0');
                                        let endMinutes = periodEnd.getUTCMinutes().toString().padStart(2, '0');
                                        let endSeconds = periodEnd.getUTCSeconds().toString().padStart(2, '0');

                                        timePeriods.push({
                                            start: `${startHours}:${startMinutes}:${startSeconds}`,
                                            end: `${endHours}:${endMinutes}:${endSeconds}`
                                        });
                                        start = periodEnd;
                                    }

                                    response.data[i].schedule[j].times[k].timePeriods = timePeriods;
                                }
                            }
                        }
                        resultSearch.value = response.data
                    } else {
                        resultSearch.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultSearch.value = false
                });
        },

        async importDoc(file) {
            const formData = new FormData();
            await formData.append('file', file);

            axios.post(`/staff/import-docs`, formData)
                .then(response => {
                    if (response.status === 200) {
                        resultDoc.value = response.data
                    } else {
                        resultDoc.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultDoc.value = false
                });
        },

        async setOrderDoctor(form) {
            await axios.post(`/orders/doctor`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultOrderDoc.value = response.data
                    } else {
                        resultOrderDoc.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultOrderDoc.value = false
                });
        },

        async changeServices(form) {
            await axios.put(`/doctors/my-services`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultChangedServices.value = response.data
                    } else {
                        resultChangedServices.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultChangedServices.value = false
                });
        },

        async changePassword(form) {
            await axios.put(`/staff/password`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultChangedPassword.value = response.data
                    } else {
                        resultChangedPassword.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultChangedPassword.value = false
                });
        },

        async updateJobPlaces(form) {
            await axios.put(`/staff/job-places`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultUpdatedJB.value = response.data
                    } else {
                        resultUpdatedJB.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultUpdatedJB.value = false
                });
        },

        async updateSchedule(id, form) {
            await axios.post(`staff/schedule`, form)
                .then(response => {
                    if (response.status === 200) {
                        resultUpdatedSchedule.value = response.data
                    } else {
                        resultUpdatedSchedule.value = false
                    }
                })
                .catch(error => {
                    console.error(error);
                    resultUpdatedSchedule.value = false
                });
        },
    }
})