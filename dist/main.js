(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};e.d({},{J:()=>L,d:()=>y});class t{constructor(e,t,n,o){this.title=e,this.description=t,this.dueDate=n,this.priority=o}}const n=[];function o(){return n}let c;function d(){let e=o();localStorage.clear(),e.forEach(((e,t)=>{localStorage.setItem(`project_${t}`,JSON.stringify(e))}))}const l=o(),a=(document.getElementById("side-block"),document.getElementById("projects-container")),s=document.getElementById("add-project"),i=document.querySelectorAll(".projects .project-option"),r=document.getElementById("all-tasks");let p=r,m=null,u=!1;function h(e,t,n){const o=document.createElement("div");o.classList.add("project");const c=document.createElement("p");c.textContent=n;const s=document.createElement("button");s.textContent="Delete";const i=document.createElement("button");i.textContent="Rename",o.appendChild(c),o.appendChild(s),o.appendChild(i),s.addEventListener("click",(()=>{l.splice(t,1),a.removeChild(o),d(),p===o&&C(r)})),i.addEventListener("click",(()=>{const t=prompt("Enter a new name for this project:");e.name=t,c.textContent=t,d()})),o.addEventListener("click",(()=>{p=o,m=e,E(p),d()})),a.appendChild(o)}function E(e){"all-tasks"===e.id?L():e.classList.contains("project")?y(m):console.log("Error something has gone wrong with selectedOption")}function C(e){const t=document.querySelectorAll(".projects .project-option-selected");0===t.length?r.classList.add("project-option-selected"):(t.forEach((e=>{e.classList.remove("project-option-selected")})),e.classList.add("project-option-selected"))}s.addEventListener("click",(()=>{u||(u=!0,d(),function(){const e=document.createElement("div"),t=document.createElement("input");t.placeholder="Enter Project Name";const n=document.createElement("button");n.textContent="Confirm";const o=document.createElement("button");o.textContent="Cancel",e.appendChild(t),e.appendChild(n),e.appendChild(o),a.appendChild(e),n.addEventListener("click",(()=>{const n=t.value;d(),function(e){const t={name:e,todos:[]};l.push(t);h(t,l.length-1,e)}(n),a.removeChild(e),u=!1})),o.addEventListener("click",(()=>{d(),a.removeChild(e),u=!1}))}())})),i.forEach((e=>{e.addEventListener("click",(()=>{d(),p=e,C(e),E(p)}))}));let f=o();!function(){c=o();for(let e=0;e<localStorage.length;e++){const t=localStorage.key(e);if(t.startsWith("project_")){const e=JSON.parse(localStorage.getItem(t));c.push(e),h(e,e.length-1)}}}();const v=[],g=(document.querySelector(".container"),document.getElementById("todo-container"));function L(){g.textContent="",j("All Tasks"),f.forEach((e=>{e.todos.forEach((e=>{const t=k(e);g.appendChild(t)}))}))}function k(e,t){const n=document.createElement("div");n.classList.add("todo-item");const o=document.createElement("h2");o.textContent=e.title;const c=document.createElement("p");c.textContent=e.description;const l=document.createElement("div");l.textContent=e.dueDate;const a=document.createElement("button");return a.textContent="Delete Task",a.classList.add("task-button"),a.addEventListener("click",(()=>{v.splice(t,1),g.removeChild(n),d()})),n.appendChild(o),n.appendChild(c),n.appendChild(l),n.appendChild(a),n}function j(e){const t=document.createElement("div");t.classList.add("todo-header");const n=document.createElement("h1");n.textContent=e,t.appendChild(n),g.appendChild(t)}let x=!1;function y(e){g.textContent="",j(e.name),e.todos.forEach((e=>{const t=k(e);g.appendChild(t)})),function(e){const n=document.createElement("button");n.textContent="Add Task",n.classList.add("task-button"),n.addEventListener("click",(()=>{x||(x=!0,d(),function(e){const n=document.createElement("div");n.classList.add("todo-form");const o=document.createElement("input");o.placeholder="Title";const c=document.createElement("textarea");c.placeholder="Description";const l=document.createElement("input");l.type="date";const a=document.createElement("button");a.textContent="Add New To Do",a.classList.add("button-small"),a.addEventListener("click",(()=>{const a=new t(o.value,c.value,l.value,!1);e.todos.push(a),d(),y(e),x=!1,g.removeChild(n)})),n.appendChild(o),n.appendChild(c),n.appendChild(l),n.appendChild(a),g.appendChild(n)}(e))})),g.appendChild(n)}(e)}})();