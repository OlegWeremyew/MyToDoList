(this.webpackJsonpMyToDoList=this.webpackJsonpMyToDoList||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},16:function(e,t,n){"use strict";n.r(t);var a=n(0),c=n.n(a),i=n(8),l=n.n(i),r=(n(14),n(5)),o=n(1),u=n(3),s=n(2),d=(n(15),n(18)),f=function(e){var t=Object(a.useState)(""),n=Object(s.a)(t,2),i=n[0],l=n[1],r=Object(a.useState)(null),o=Object(s.a)(r,2),u=o[0],d=o[1],f=function(){var t=i.trim();""!==t&&e.callBack(t)};return c.a.createElement("div",null,c.a.createElement("input",{value:i,onChange:function(e){l(e.currentTarget.value)},onKeyPress:function(e){d(null),"Enter"===e.key&&f()},className:u?"error":""}),c.a.createElement("button",{onClick:f},"+"),u&&c.a.createElement("div",{className:"error-message"},u))},b=function(e){var t=Object(a.useState)(!1),n=Object(s.a)(t,2),i=n[0],l=n[1],r=Object(a.useState)(e.title),o=Object(s.a)(r,2),u=o[0],d=o[1];return i?c.a.createElement("input",{onChange:function(e){var t=e.currentTarget.value;d(t)},onBlur:function(){l(!1),e.callBack(u)},value:u,autoFocus:!0}):c.a.createElement("span",{onDoubleClick:function(){l(!0)}},e.title)};function m(e){return c.a.createElement("div",null,c.a.createElement("h3",null,c.a.createElement(b,{title:e.title,callBack:function(t){e.updateTodolist(e.id,t)}}),c.a.createElement("button",{onClick:function(){return e.removeTodolist(e.id)}},"x")),c.a.createElement("div",null,c.a.createElement(f,{callBack:function(t){e.addTask(t,e.id)}})),c.a.createElement("ul",null,e.tasks.map((function(t){return c.a.createElement("li",{key:t.id,className:t.isDone?"is-done":""},c.a.createElement("input",{type:"checkbox",onChange:function(n){var a=n.currentTarget.checked;e.changeTaskStatus(t.id,a,e.id)},checked:t.isDone}),c.a.createElement(b,{title:t.title,callBack:function(n){e.updateTask(e.id,t.id,n)}}),c.a.createElement("button",{onClick:function(){return e.removeTask(t.id,e.id)}},"x"))}))),c.a.createElement("div",null,c.a.createElement("button",{className:"all"===e.filter?"active-filter":"",onClick:function(){return e.changeFilter("all",e.id)}},"All"),c.a.createElement("button",{className:"active"===e.filter?"active-filter":"",onClick:function(){return e.changeFilter("active",e.id)}},"Active"),c.a.createElement("button",{className:"completed"===e.filter?"active-filter":"",onClick:function(){return e.changeFilter("completed",e.id)}},"Completed")))}var j=function(){var e,t=Object(d.a)(),n=Object(d.a)(),i=Object(a.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to buy",filter:"all"}]),l=Object(s.a)(i,2),b=l[0],j=l[1],O=Object(a.useState)((e={},Object(u.a)(e,t,[{id:Object(d.a)(),title:"HTML&CSS",isDone:!0},{id:Object(d.a)(),title:"JS",isDone:!0}]),Object(u.a)(e,n,[{id:Object(d.a)(),title:"Milk",isDone:!0},{id:Object(d.a)(),title:"React Book",isDone:!0}]),e)),v=Object(s.a)(O,2),k=v[0],E=v[1];function h(e,t){var n=k[t];k[t]=n.filter((function(t){return t.id!=e})),E(Object(o.a)({},k))}function p(e,t){var n={id:Object(d.a)(),title:e,isDone:!1},a=k[t];k[t]=[n].concat(Object(r.a)(a)),E(Object(o.a)({},k))}function g(e,t,n){var a=k[n].find((function(t){return t.id===e}));a&&(a.isDone=t,E(Object(o.a)({},k)))}function T(e,t){var n=b.find((function(e){return e.id===t}));n&&(n.filter=e,j(Object(r.a)(b)))}function D(e){j(b.filter((function(t){return t.id!==e}))),delete k[e],E(Object(o.a)({},k))}var C=function(e,t,n){console.log("fgfg"),E(Object(o.a)(Object(o.a)({},k),{},Object(u.a)({},e,k[e].map((function(e){return e.id===t?Object(o.a)(Object(o.a)({},e),{},{title:n}):e})))))},B=function(e,t){j(Object(r.a)(b.map((function(n){return n.id===e?Object(o.a)(Object(o.a)({},n),{},{title:t}):n}))))};return c.a.createElement("div",{className:"App"},c.a.createElement(f,{callBack:function(e){return function(e){console.log(e);var t=Object(d.a)();j([{id:t,title:e,filter:"all"}].concat(Object(r.a)(b))),E(Object(o.a)(Object(o.a)({},k),{},Object(u.a)({},t,[{id:Object(d.a)(),title:"Milk",isDone:!0},{id:Object(d.a)(),title:"React Book",isDone:!0}])))}(e)}}),b.map((function(e){var t=k[e.id],n=t;return"active"===e.filter&&(n=t.filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(n=t.filter((function(e){return!0===e.isDone}))),c.a.createElement(m,{key:e.id,id:e.id,title:e.title,tasks:n,removeTask:h,changeFilter:T,addTask:p,changeTaskStatus:g,filter:e.filter,removeTodolist:D,updateTask:C,updateTodolist:B})})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(c.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},9:function(e,t,n){e.exports=n(16)}},[[9,1,2]]]);
//# sourceMappingURL=main.9ce35833.chunk.js.map