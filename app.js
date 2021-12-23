// ----------------- selectors ----------------- 
let date = document.querySelector('.date');


// ----------------- date at top of page ----------------- 
let today = new Date();
let day = `${today.getDate() < 10 ? '0' : ""}${today.getDate()}`;
let month = `${(today.getMonth() + 1) < 10 ? '0' : ""}${today.getMonth() + 1}`;
let year = today.getFullYear();

date.textContent = `${day}/${month}/${year}`;