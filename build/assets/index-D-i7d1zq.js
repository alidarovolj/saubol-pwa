import{u as k,s as y,r as c,t as C,x as _,a as n,b as e,i as S,j as A,o as l,d as w,v as h,n as d,f as B,h as V}from"./index-BZlZztwk.js";import{_ as $}from"./orders.vue_vue_type_script_setup_true_lang-B96A8iBV.js";import{S as D}from"./spinner-2k92dcTC.js";import{i as j}from"./index-BTutWPBR.js";import{u as z}from"./staff-D1zJf4JU.js";const E={class:"bg-white py-2 mt-3"},M={class:"container mx-auto px-4 lg:px-0"},N={key:0},P=e("p",{class:"text-mainColor font-bold mb-4"}," Предоставляемые услуги ",-1),T={class:"flex items-center justify-between mb-4"},U=e("p",{class:"text-sm font-bold"}," Консультация ",-1),Z=["checked"],F={class:"flex items-center justify-between mb-4"},R=e("p",{class:"text-sm font-bold"}," Выезд ",-1),q=["checked"],G=e("p",{class:"text-mainColor font-bold mb-4"}," Безопасность ",-1),H={key:0,class:"mb-4"},I=e("p",{class:"text-sm font-bold text-[#9A9BA4]"}," Пароль ",-1),J=e("p",{class:"text-lg"}," ************* ",-1),K={key:1},L={class:"mb-3"},O=e("p",{class:"text-sm font-semibold mb-2"}," Пароль ",-1),Q={class:"mb-3"},W=e("p",{class:"text-sm font-semibold mb-2"}," Подтверждение пароля ",-1),X={class:"list-disc pl-5 mb-5"},Y={key:0},ee={key:1,class:"bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg"},se=e("span",{class:"spinner"},null,-1),te=[se],ce={__name:"index",setup(oe){const u=k(),{result:b}=y(u),m=z(),f=c(!0),p=c(!1),r=c(!1),o=c({service_ids:[]}),t=c({password:"",password_confirmation:""}),v=(a,s)=>{j(a,{type:s,autoClose:1e3})},g=async()=>{p.value=!0,t.value.password===t.value.password_confirmation?t.value.password.length>=8&&/[A-Z]/.test(t.value.password)&&/[a-z]/.test(t.value.password)&&/[0-9]/.test(t.value.password)?(await _(),await m.changePassword(t.value),r.value=!1,v("Пароль успешно изменен","success")):v("Пароль не соответствует требованиям","error"):v("Пароли не совпадают","error"),p.value=!1},x=async a=>{o.value.service_ids.includes(a)?o.value.service_ids=o.value.service_ids.filter(s=>s!==a):o.value.service_ids.push(a),await _(),await m.changeServices(o.value),await u.getProfile()};return C(async()=>{await _(),await u.getProfile(),o.value.service_ids=b.value.data.staff.services.map(a=>a.service_id),f.value=!1}),(a,s)=>(l(),n("div",E,[e("div",M,[S($,null,{default:A(()=>[f.value?(l(),V(D,{key:1})):(l(),n("div",N,[e("div",null,[P,e("div",T,[U,e("input",{onClick:s[0]||(s[0]=i=>x(1)),type:"checkbox",class:"toggle cursor-pointer",checked:o.value.service_ids.includes(1)},null,8,Z)]),e("div",F,[R,e("input",{onClick:s[1]||(s[1]=i=>x(2)),type:"checkbox",class:"toggle cursor-pointer",checked:o.value.service_ids.includes(2)},null,8,q)]),e("div",null,[G,r.value?(l(),n("div",K,[e("div",L,[O,w(e("input",{"onUpdate:modelValue":s[3]||(s[3]=i=>t.value.password=i),type:"password",class:"p-3 border w-full rounded-lg text-sm",placeholder:"Введите телефон"},null,512),[[h,t.value.password]])]),e("div",Q,[W,w(e("input",{"onUpdate:modelValue":s[4]||(s[4]=i=>t.value.password_confirmation=i),type:"password",class:"p-3 border w-full rounded-lg text-sm",placeholder:"Введите телефон"},null,512),[[h,t.value.password_confirmation]])]),e("ul",X,[e("li",{class:d({"text-green-400":t.value.password.length>=8})},"Длина пароля должна быть не менее 8 символов ",2),e("li",{class:d({"text-green-400":/[A-Z]/.test(t.value.password)})},"Латинские заглавные буквы",2),e("li",{class:d({"text-green-400":/[a-z]/.test(t.value.password)})},"Латинские строчные буквы",2),e("li",{class:d({"text-green-400":/[0-9]/.test(t.value.password)})},"Цифры 0-9",2)]),e("p",{onClick:s[5]||(s[5]=i=>r.value=!1),class:"text-mainColor text-sm cursor-pointer"}," Отменить редактирование "),r.value?(l(),n("div",Y,[p.value?(l(),n("p",ee,te)):(l(),n("p",{key:0,onClick:g,class:"bg-[#1EDA00] cursor-pointer text-white mt-4 text-center py-2 rounded-lg"}," Сохранить "))])):B("",!0)])):(l(),n("div",H,[I,J,e("p",{onClick:s[2]||(s[2]=i=>r.value=!0),class:"text-mainColor text-sm cursor-pointer"}," Редактировать ")]))])])]))]),_:1})])]))}};export{ce as default};
