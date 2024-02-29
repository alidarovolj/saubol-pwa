import{q as j,r as s,m as u}from"./index-BZlZztwk.js";const z=j("staff",()=>{const g=s(null),v=s(null),y=s(null),m=s(null),w=s(null),D=s(null),T=s(null),h=s(null),U=s(null),$=s(null),p=s(null),C=s(null),P=s(null);return{result:g,resultDetail:v,resultSpecs:y,resultSearch:m,resultRegister:w,resultDoc:D,resultOrderDoc:T,resultUpdate:h,resultUpdateSpec:U,resultChangedServices:$,resultChangedPassword:p,resultUpdatedJB:C,resultUpdatedSchedule:P,getStaff(a={}){const t=new URLSearchParams(a).toString();u.get(`/staff/?${t}`).then(e=>{e.status===200?g.value=e.data:g.value=!1}).catch(e=>{console.error(e),g.value=!1})},async updateStaff(a){await u.put("/doctors/",a).then(t=>{t.status===200?(h.value=t.data,console.log(h.value)):h.value=!1}).catch(t=>{console.error(t),h.value=!1})},async updateSpecStaff(a){await u.put("/doctors/specialization-details",a).then(t=>{t.status===200?U.value=t.data:U.value=!1}).catch(t=>{console.error(t),U.value=!1})},async registerStaff(a){await u.post("/staff/",a).then(t=>{t.status===200?w.value=t.data:w.value=!1}).catch(t=>{console.error(t),w.value=!1})},async getStaffDetail(a){await u.get("/staff/"+a).then(t=>{if(t.status===200){let e=["вс","пн","вт","ср","чт","пт","сб"];for(let r=0;r<t.schedule.length;r++){let l=new Date(t.schedule[r].day),d=e[l.getDay()],b=l.getDate().toString().padStart(2,"0");t.schedule[r].dayOfWeek=d,t.schedule[r].dayNumber=b;for(let i=0;i<t.schedule[r].times.length;i++){let k=[],c=new Date(`1970-01-01T${t.schedule[r].times[i].start}Z`),S=new Date(`1970-01-01T${t.schedule[r].times[i].end}Z`),n=t.schedule[r].duration;for(;c<S;){let o=new Date(c.getTime()+n*6e4);if(o>S)break;let H=c.getUTCHours().toString().padStart(2,"0"),f=c.getUTCMinutes().toString().padStart(2,"0"),M=c.getUTCSeconds().toString().padStart(2,"0"),O=o.getUTCHours().toString().padStart(2,"0"),R=o.getUTCMinutes().toString().padStart(2,"0"),N=o.getUTCSeconds().toString().padStart(2,"0");k.push({start:`${H}:${f}:${M}`,end:`${O}:${R}:${N}`}),c=o}t.schedule[r].times[i].timePeriods=k}}v.value=t.data}else v.value=!1}).catch(t=>{console.error(t),v.value=!1})},async specializationList(){await u.get("/staff/specialization").then(a=>{a.status===200?y.value=a.data:y.value=!1}).catch(a=>{console.error(a),y.value=!1})},async searchStaff(a={}){const t=new URLSearchParams(a).toString();await u.get(`/staff/search/?${t}`).then(e=>{if(e.status===200){let r=["вс","пн","вт","ср","чт","пт","сб"];for(let l=0;l<e.data.length;l++)for(let d=0;d<e.data[l].schedule.length;d++){let b=new Date(e.data[l].schedule[d].day),i=r[b.getDay()],k=b.getDate().toString().padStart(2,"0");e.data[l].schedule[d].dayOfWeek=i,e.data[l].schedule[d].dayNumber=k;for(let c=0;c<e.data[l].schedule[d].times.length;c++){let S=[],n=new Date(`1970-01-01T${e.data[l].schedule[d].times[c].start}Z`),o=new Date(`1970-01-01T${e.data[l].schedule[d].times[c].end}Z`),H=e.data[l].schedule[d].duration;for(;n<o;){let f=new Date(n.getTime()+H*6e4);if(f>o)break;let M=n.getUTCHours().toString().padStart(2,"0"),O=n.getUTCMinutes().toString().padStart(2,"0"),R=n.getUTCSeconds().toString().padStart(2,"0"),N=f.getUTCHours().toString().padStart(2,"0"),W=f.getUTCMinutes().toString().padStart(2,"0"),Z=f.getUTCSeconds().toString().padStart(2,"0");S.push({start:`${M}:${O}:${R}`,end:`${N}:${W}:${Z}`}),n=f}e.data[l].schedule[d].times[c].timePeriods=S}}m.value=e.data}else m.value=!1}).catch(e=>{console.error(e),m.value=!1})},async importDoc(a){const t=new FormData;await t.append("file",a),u.post("/staff/import-docs",t).then(e=>{e.status===200?D.value=e.data:D.value=!1}).catch(e=>{console.error(e),D.value=!1})},async setOrderDoctor(a){await u.post("/orders/doctor",a).then(t=>{t.status===200?T.value=t.data:T.value=!1}).catch(t=>{console.error(t),T.value=!1})},async changeServices(a){await u.put("/doctors/my-services",a).then(t=>{t.status===200?$.value=t.data:$.value=!1}).catch(t=>{console.error(t),$.value=!1})},async changePassword(a){await u.put("/staff/password",a).then(t=>{t.status===200?p.value=t.data:p.value=!1}).catch(t=>{console.error(t),p.value=!1})},async updateJobPlaces(a){await u.put("/staff/job-places",a).then(t=>{t.status===200?C.value=t.data:C.value=!1}).catch(t=>{console.error(t),C.value=!1})},async updateSchedule(a,t){await u.post("staff/schedule",t).then(e=>{e.status===200?P.value=e.data:P.value=!1}).catch(e=>{console.error(e),P.value=!1})}}});export{z as u};