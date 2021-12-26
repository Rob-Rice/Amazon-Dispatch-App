// ----------------- setters ----------------- 
let date = document.querySelector('.date');
let today = new Date();
let day = `${today.getDate() < 10 ? '0' : ""}${today.getDate()}`;
let month = `${(today.getMonth() + 1) < 10 ? '0' : ""}${today.getMonth() + 1}`;
let year = today.getFullYear();
let count = 0;

// ----------------- selectors ----------------- 
const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');



// ----------------- date at top of page ----------------- 
date.textContent = `${day}/${month}/${year}`;

// ----------------- functions ----------------- 
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')) {
            count--;
        } else if (styles.contains('increase')) {
            count++;
        }


        value.textContent = count;
    });
});
