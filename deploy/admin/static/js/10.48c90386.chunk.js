(this["webpackJsonpapp-frontend"]=this["webpackJsonpapp-frontend"]||[]).push([[10],{650:function(e,t,c){"use strict";c.r(t);var a=c(100),n=c(2),i=c(23),r=c(24),s=c(4),o=c(68),d=c(5),b=function(e){return e.musicTrack.form},u=Object(d.a)([b],(function(e){return e.record})),j={selectInitLoading:Object(d.a)([b],(function(e){return Boolean(e.initLoading)})),selectSaveLoading:Object(d.a)([b],(function(e){return Boolean(e.saveLoading)})),selectRecord:u,selectRaw:b},m=c(12),O=c(593),l=c(493),g=c(496),f=c(6);t.default=function(e){var t=Object(n.useState)(!1),c=Object(a.a)(t,2),d=c[0],b=c[1],u=Object(i.d)(),p=Object(r.h)(),h=Object(i.e)(j.selectInitLoading),k=Object(i.e)(j.selectSaveLoading),x=Object(i.e)(j.selectRecord),L=Boolean(p.params.id),v=L?Object(s.c)("entities.musicTrack.edit.title"):Object(s.c)("entities.musicTrack.new.title");return Object(n.useEffect)((function(){u(o.a.doInit(p.params.id)),b(!0)}),[u,p.params.id]),Object(f.jsxs)(f.Fragment,{children:[Object(f.jsx)(l.a,{items:[[Object(s.c)("dashboard.menu"),"/"],[Object(s.c)("entities.musicTrack.menu"),"/music-track"],[v]]}),Object(f.jsxs)("div",{className:"mt-4 p-6 bg-white dark:bg-gray-800 dark:border-gray-800 text-gray-900 dark:text-gray-200 border-gray-200 border rounded-md",children:[Object(f.jsx)("h1",{className:"text-lg font-medium mb-6",children:v}),h&&Object(f.jsx)(g.a,{}),d&&!h&&Object(f.jsx)(O.a,{saveLoading:k,initLoading:h,record:x,isEditing:L,onSubmit:function(e,t){u(L?o.a.doUpdate(e,t):o.a.doCreate(t))},onCancel:function(){return Object(m.b)().push("/music-track")}})]})]})}}}]);