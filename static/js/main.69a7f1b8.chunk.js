(this.webpackJsonpMyToDoList=this.webpackJsonpMyToDoList||[]).push([[0],{14:function(t,e,n){},15:function(t,e,n){},17:function(t,e,n){"use strict";n.r(e);var c=n(1),i=n(9),a=n.n(i),o=(n(14),n(6)),r=n(2),l=n(4),s=n(3),u=(n(15),n(19)),j=n(0),d=function(t){var e=Object(c.useState)(""),n=Object(s.a)(e,2),i=n[0],a=n[1],o=Object(c.useState)(null),r=Object(s.a)(o,2),l=r[0],u=r[1],d=function(){var e=i.trim();""!==e&&t.callBack(e)};return Object(j.jsxs)("div",{children:[Object(j.jsx)("input",{value:i,onChange:function(t){a(t.currentTarget.value)},onKeyPress:function(t){u(null),"Enter"===t.key&&d()},className:l?"error":""}),Object(j.jsx)("button",{onClick:d,children:"+"}),l&&Object(j.jsx)("div",{className:"error-message",children:l})]})},b=function(t){var e=Object(c.useState)(!1),n=Object(s.a)(e,2),i=n[0],a=n[1],o=Object(c.useState)(t.title),r=Object(s.a)(o,2),l=r[0],u=r[1];return i?Object(j.jsx)("input",{onChange:function(t){var e=t.currentTarget.value;u(e)},onBlur:function(){a(!1),t.callBack(l)},value:l,autoFocus:!0}):Object(j.jsx)("span",{onDoubleClick:function(){a(!0)},children:t.title})};function O(t){return Object(j.jsxs)("div",{children:[Object(j.jsxs)("h3",{children:[Object(j.jsx)(b,{title:t.title,callBack:function(e){t.updateTodolist(t.id,e)}}),Object(j.jsx)("button",{onClick:function(){return t.removeTodolist(t.id)},children:"x"})]}),Object(j.jsx)("div",{children:Object(j.jsx)(d,{callBack:function(e){t.addTask(e,t.id)}})}),Object(j.jsx)("ul",{children:t.tasks.map((function(e){return Object(j.jsxs)("li",{className:e.isDone?"is-done":"",children:[Object(j.jsx)("input",{type:"checkbox",onChange:function(n){var c=n.currentTarget.checked;t.changeTaskStatus(e.id,c,t.id)},checked:e.isDone}),Object(j.jsx)(b,{title:e.title,callBack:function(n){t.updateTask(t.id,e.id,n)}}),Object(j.jsx)("button",{onClick:function(){return t.removeTask(e.id,t.id)},children:"x"})]},e.id)}))}),Object(j.jsxs)("div",{children:[Object(j.jsx)("button",{className:"all"===t.filter?"active-filter":"",onClick:function(){return t.changeFilter("all",t.id)},children:"All"}),Object(j.jsx)("button",{className:"active"===t.filter?"active-filter":"",onClick:function(){return t.changeFilter("active",t.id)},children:"Active"}),Object(j.jsx)("button",{className:"completed"===t.filter?"active-filter":"",onClick:function(){return t.changeFilter("completed",t.id)},children:"Completed"})]})]})}var f=function(){var t,e=Object(u.a)(),n=Object(u.a)(),i=Object(c.useState)([{id:e,title:"What to learn",filter:"all"},{id:n,title:"What to buy",filter:"all"}]),a=Object(s.a)(i,2),b=a[0],f=a[1],h=Object(c.useState)((t={},Object(l.a)(t,e,[{id:Object(u.a)(),title:"HTML&CSS",isDone:!0},{id:Object(u.a)(),title:"JS",isDone:!0}]),Object(l.a)(t,n,[{id:Object(u.a)(),title:"Milk",isDone:!0},{id:Object(u.a)(),title:"React Book",isDone:!0}]),t)),v=Object(s.a)(h,2),k=v[0],m=v[1];function x(t,e){var n=k[e];k[e]=n.filter((function(e){return e.id!=t})),m(Object(r.a)({},k))}function p(t,e){var n={id:Object(u.a)(),title:t,isDone:!1},c=k[e];k[e]=[n].concat(Object(o.a)(c)),m(Object(r.a)({},k))}function g(t,e,n){var c=k[n].find((function(e){return e.id===t}));c&&(c.isDone=e,m(Object(r.a)({},k)))}function T(t,e){var n=b.find((function(t){return t.id===e}));n&&(n.filter=t,f(Object(o.a)(b)))}function D(t){f(b.filter((function(e){return e.id!==t}))),delete k[t],m(Object(r.a)({},k))}var C=function(t,e,n){console.log("fgfg"),m(Object(r.a)(Object(r.a)({},k),{},Object(l.a)({},t,k[t].map((function(t){return t.id===e?Object(r.a)(Object(r.a)({},t),{},{title:n}):t})))))},B=function(t,e){f(Object(o.a)(b.map((function(n){return n.id===t?Object(r.a)(Object(r.a)({},n),{},{title:e}):n}))))};return Object(j.jsxs)("div",{className:"App",children:[Object(j.jsx)(d,{callBack:function(t){return function(t){console.log(t);var e=Object(u.a)();f([{id:e,title:t,filter:"all"}].concat(Object(o.a)(b))),m(Object(r.a)(Object(r.a)({},k),{},Object(l.a)({},e,[{id:Object(u.a)(),title:"Milk",isDone:!0},{id:Object(u.a)(),title:"React Book",isDone:!0}])))}(t)}}),b.map((function(t){var e=k[t.id],n=e;return"active"===t.filter&&(n=e.filter((function(t){return!1===t.isDone}))),"completed"===t.filter&&(n=e.filter((function(t){return!0===t.isDone}))),Object(j.jsx)(O,{id:t.id,title:t.title,tasks:n,removeTask:x,changeFilter:T,addTask:p,changeTaskStatus:g,filter:t.filter,removeTodolist:D,updateTask:C,updateTodolist:B},t.id)}))]})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a.a.render(Object(j.jsx)(f,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))}},[[17,1,2]]]);
//# sourceMappingURL=main.69a7f1b8.chunk.js.map