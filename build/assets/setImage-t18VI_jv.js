import{c as n,u as c,s as i,e as r,q as d,f,g as e}from"./index-CvdpWBVJ.js";var I=n("edit","IconEdit",[["path",{d:"M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1",key:"svg-0"}],["path",{d:"M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z",key:"svg-1"}],["path",{d:"M16 5l3 3",key:"svg-2"}]]);const m={id:"setImage",class:"modal"},u={class:"modal-box"},_=e("form",{method:"dialog"},[e("button",{class:"btn btn-sm btn-circle btn-ghost absolute right-2 top-2"},"✕")],-1),h=e("h3",{class:"font-bold text-xl mb-5"}," Установить фотографию ",-1),g=e("form",{method:"dialog",class:"modal-backdrop"},[e("button",null,"close")],-1),k={__name:"setImage",setup(p){const t=c(),{resultImage:a}=i(t),s=r(null),l=()=>{if(s.value&&s.value.files[0]){const o=s.value.files[0];t.setImage(o),a?(t.getProfile(),setImage.close()):notify(!1,"Ошибка загрузки фотографии")}};return(o,b)=>(d(),f("dialog",m,[e("div",u,[_,h,e("input",{type:"file",ref_key:"fileInput",ref:s,onChange:l},null,544)]),g]))}};export{I,k as _};