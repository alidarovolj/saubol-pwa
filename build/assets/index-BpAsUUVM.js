import{u as w}from"./orders-B2kQDRVp.js";import{c as b,e as y,u as k,s as C,P as A,Q as B,z as q,A as R,D as F,f as r,g as e,a as n,o as d,n as u,i as c,F as m,p as S,q as t,t as p,B as V,l as v,C as o}from"./index-CvdpWBVJ.js";import{_ as j}from"./orders.vue_vue_type_script_setup_true_lang-DotosKrB.js";import{S as L}from"./spinner-2xjK-I4S.js";var N=b("chevron-right","IconChevronRight",[["path",{d:"M9 6l6 6l-6 6",key:"svg-0"}]]);const O={class:"bg-white py-2"},T={class:"container mx-auto px-4 lg:px-0"},z={class:"flex gap-2 overflow-x-auto"},D={class:"mt-8"},E={class:"container mx-auto px-4 lg:px-0"},I={key:0},M={key:0,class:"text-red-500 text-center my-10"},P={key:1},Q={style:{"box-shadow":"0px 0px 10px 0px #0000001A"},class:"bg-white p-4 rounded-lg"},U={class:"flex items-center justify-between mb-2"},$={class:"text-sm flex items-center gap-2"},G={class:"bg-mainColor text-white px-4 py-1 rounded"},H={class:"flex justify-between mb-2"},J={class:"w-1/2"},K=e("p",{class:"text-xs text-[#9A9BA4]"}," Дата ",-1),W={class:"text-sm"},X={class:"w-1/2"},Y=e("p",{class:"text-xs text-[#9A9BA4]"}," Цена ",-1),Z={class:"text-sm"},ee={class:"flex justify-between"},se={class:"w-1/2"},te=e("p",{class:"text-xs text-[#9A9BA4]"}," Время ",-1),oe={class:"text-sm"},ae={class:"w-1/2"},ce=e("p",{class:"text-xs text-[#9A9BA4]"}," Тип ",-1),re={class:"text-sm"},xe={__name:"index",setup(ne){const f=y("profile"),g=k();C(g);const a=A(),x=B(),l=w(),i=y(!0);return q(async()=>{await R(),x.push({query:{...x.currentRoute.value.query,type:"created"}}),await l.listOrders(a.query),i.value=!1}),F(a,async()=>{i.value=!0,await l.listOrders(a.query),i.value=!1}),(de,le)=>{const _=S("RouterLink");return t(),r(m,null,[e("div",O,[e("div",T,[e("div",z,[n(_,{to:"/orders?type=created",class:u([{"bg-mainColor text-white":c(a).query.type==="created"},"py-2 px-8 rounded-lg"])},{default:d(()=>[p(" Новые ")]),_:1},8,["class"]),n(_,{to:"/orders?type=accepted",class:u([{"bg-mainColor text-white":c(a).query.type==="accepted"},"py-2 px-8 rounded-lg"])},{default:d(()=>[p(" Принятые ")]),_:1},8,["class"]),n(_,{to:"/orders?type=completed",class:u([{"bg-mainColor text-white":c(a).query.type==="completed"},"py-2 px-8 rounded-lg"])},{default:d(()=>[p(" Завершенные ")]),_:1},8,["class"])])])]),e("div",D,[e("div",E,[n(j,{name:f.value},{default:d(()=>[i.value?(t(),v(L,{key:1})):(t(),r("div",I,[c(l).result.length===0?(t(),r("p",M," У вас нет заказов ")):(t(),r("div",P,[e("div",Q,[(t(!0),r(m,null,V(c(l).result.data,(s,h)=>(t(),v(_,{to:"/orders/"+s.id,key:h,class:u(["block p-3 rounded",{"!bg-[#E7F0FF]":h%2===0}])},{default:d(()=>[e("div",U,[e("div",$,[e("p",null," №"+o(s.order_number),1),e("p",G,o(s.status),1)]),n(c(N))]),e("div",H,[e("div",J,[K,e("p",W,o(s.date.day),1)]),e("div",X,[Y,e("p",Z,o(s.price),1)])]),e("div",ee,[e("div",se,[te,e("p",oe,o(s.date.start)+" - "+o(s.date.end),1)]),e("div",ae,[ce,e("p",re,o(s.name),1)])])]),_:2},1032,["to","class"]))),128))])]))]))]),_:1},8,["name"])])])],64)}}};export{xe as default};
