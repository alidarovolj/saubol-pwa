import{e as _,u as h,s as u,z as f,A as b,f as t,g as s,a as l,o as g,F as p,q as e,i as o,j as m,C as i,B as v}from"./index-CvdpWBVJ.js";import{_ as E,P as w}from"./profileNavigation--3qh-Csw.js";import{I as y,_ as C}from"./setImage-t18VI_jv.js";import"./spinner-2xjK-I4S.js";import"./index-kTOYWjdU.js";const A={class:"mt-8"},k={class:"container mx-auto px-4 lg:px-0"},B={key:0,style:{"box-shadow":"0px 4px 20px 0px #0000001A"},class:"mt-5 rounded-lg lg:mt-0 w-full lg:w-2/3 bg-white"},F={class:"flex items-center justify-between text-mainColor w-full bg-[#E7F0FF] px-4 py-2"},j=s("h1",{class:"text-mainColor font-bold"}," Мои данные ",-1),M={class:"flex items-center gap-5"},N={key:0,class:"w-max"},z={key:0,type:"submit",class:"bg-mainColor text-center text-white px-5 py-2 rounded-lg"},P={key:1,class:"w-max bg-mainColor text-center text-white px-5 py-2 rounded-lg"},V=s("span",{class:"spinner"},null,-1),$=[V],I={class:"p-5 flex flex-col gap-3"},S={class:""},T=s("p",{class:"text-sm text-[#9A9BA4]"}," Профиль работы ",-1),q={class:"p-3 border-b border-[#235CEE40]"},D={class:""},L=s("p",{class:"text-sm text-[#9A9BA4]"}," Номер телефона ",-1),R={class:"p-3 border-b border-[#235CEE40]"},U={class:""},G=s("p",{class:"text-sm text-[#9A9BA4]"}," ИИН ",-1),H={class:"p-3 border-b border-[#235CEE40]"},J={class:""},K=s("p",{class:"text-sm text-[#9A9BA4]"}," Email ",-1),O={class:"p-3 border-b border-[#235CEE40]"},Q={class:""},W=s("p",{class:"text-sm text-[#9A9BA4]"}," Места работы ",-1),X={class:"flex flex-col gap-1 border-b border-[#235CEE40]"},Y={class:"p-3"},ns={__name:"index",setup(Z){const x=_("profile"),d=h(),{result:a}=u(d);return _([{title:"Главная",link:"/"},{title:"Профиль",link:"/profile"}]),f(async()=>{await b(),await d.getProfile()}),(n,c)=>(e(),t(p,null,[s("div",A,[s("div",k,[l(E,{name:x.value},{default:g(()=>[l(w),o(a)?(e(),t("div",B,[s("div",F,[j,s("div",M,[n.editMode?(e(),t("div",N,[n.loading?(e(),t("p",P,$)):(e(),t("button",z," Обновить "))])):m("",!0),l(o(y),{class:"cursor-pointer",size:"24",onClick:c[0]||(c[0]=r=>n.editMode=!n.editMode)})])]),s("div",I,[s("div",S,[T,s("p",q,i(o(a).data.staff.specialization.name),1)]),s("div",D,[L,s("p",R,i(o(a).data.phone_number),1)]),s("div",U,[G,s("p",H,i(o(a).data.iin),1)]),s("div",J,[K,s("p",O,i(o(a).data.email),1)]),s("div",Q,[W,s("div",X,[(e(!0),t(p,null,v(o(a).data.staff.job_places,(r,ss)=>(e(),t("p",Y,i(r.job_place),1))),256))])])])])):m("",!0)]),_:1},8,["name"])])]),l(C)],64))}};export{ns as default};