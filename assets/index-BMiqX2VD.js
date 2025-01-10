(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))d(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const o of n.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&d(o)}).observe(document,{childList:!0,subtree:!0});function i(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerPolicy&&(n.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?n.credentials="include":t.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function d(t){if(t.ep)return;t.ep=!0;const n=i(t);fetch(t.href,n)}})();const c=[],l=document.getElementById("task-title"),u=document.getElementById("task-desc"),k=document.getElementById("add-task-btn"),f=document.getElementById("pending-tasks");function b(){const s=localStorage.getItem("tasks");s&&c.push(...JSON.parse(s))}function a(){localStorage.setItem("tasks",JSON.stringify(c))}function r(){f.innerHTML="";const s=document.getElementById("completed-tasks");s.innerHTML="",c.filter(e=>!e.completed).forEach(e=>{var i,d,t,n;const o=document.createElement("li");o.classList.add("task-item"),o.innerHTML=`
      <div class="task-content">
        <strong>${e.title}</strong>
        <p class="task-description">${e.description}</p>
      </div>
      <div class="task-actions">
        <button class="expand-desc-btn">⬇</button>
        <button class="edit-task-btn">✏</button>
        <button class="mark-complete-btn">✔</button>
        <button class="remove-task-btn">❌</button>
      </div>
    `,(i=o.querySelector(".expand-desc-btn"))===null||i===void 0||i.addEventListener("click",()=>p(o)),(d=o.querySelector(".edit-task-btn"))===null||d===void 0||d.addEventListener("click",()=>v(e.id)),(t=o.querySelector(".mark-complete-btn"))===null||t===void 0||t.addEventListener("click",()=>L(e.id)),(n=o.querySelector(".remove-task-btn"))===null||n===void 0||n.addEventListener("click",()=>m(e.id)),f.appendChild(o)}),c.filter(e=>e.completed).forEach(e=>{var i,d,t;const n=document.createElement("li");n.classList.add("task-item"),n.innerHTML=`
      <div class="task-content">
        <strong>${e.title}</strong>
        <p class="task-description">${e.description}</p>
      </div>
      <div class="task-actions">
        <button class="expand-desc-btn">⬇</button>
        <button class="mark-pending-btn">⏪</button>
        <button class="remove-task-btn">❌</button>
      </div>
    `,(i=n.querySelector(".expand-desc-btn"))===null||i===void 0||i.addEventListener("click",()=>p(n)),(d=n.querySelector(".mark-pending-btn"))===null||d===void 0||d.addEventListener("click",()=>y(e.id)),(t=n.querySelector(".remove-task-btn"))===null||t===void 0||t.addEventListener("click",()=>m(e.id)),s.appendChild(n)})}function p(s){s.classList.contains("expanded")?s.classList.remove("expanded"):s.classList.add("expanded")}function v(s){const e=c.find(t=>t.id===s);if(!e)return;const i=prompt("Edit Task Title:",e.title),d=prompt("Edit Task Description:",e.description);i!==null&&(e.title=i),d!==null&&(e.description=d),a(),r()}function g(){const s=l.value.trim(),e=u.value.trim();if(!s){alert("Task title is required!");return}const i={id:Date.now(),title:s,description:e,completed:!1};c.push(i),l.value="",u.value="",a(),r()}function L(s){const e=c.find(i=>i.id===s);e&&(e.completed=!0,a(),r())}function y(s){const e=c.find(i=>i.id===s);e&&(e.completed=!1,a(),r())}function m(s){const e=c.findIndex(i=>i.id===s);e!==-1&&(c.splice(e,1),a(),r())}document.addEventListener("DOMContentLoaded",()=>{k.addEventListener("click",g),b(),r()});
