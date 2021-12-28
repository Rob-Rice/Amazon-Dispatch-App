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
const driverInput = document.querySelector('.driver-input');
const cxInput = document.querySelector('.route-number');
const vanInput = document.querySelector('.driver-van');
const addBtn = document.querySelector('.add-btn');
const driverList = document.querySelector('.driver-list');



// date at top of page
date.textContent = `${day}/${month}/${year}`;

// ----------------- functions ----------------- 

// van number counter
btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // stop form from submitting
        const styles = e.currentTarget.classList;
        if(styles.contains('decrease')) { // adding to count
            count--;
        } else if (styles.contains('increase')) { // subtracting from count 
            count++;
        }


        value.textContent = count;
    });
});

// add drivers to list
addBtn.addEventListener('click', addDriver);

function addDriver(event) {
    // driver div
    const driverDiv = document.createElement('div'); 
    driverDiv.classList.add('driverAdded');
    // create the li for driver
    const newDriver = document.createElement('li');
    newDriver.innerText = driverInput.value;
    newDriver.classList.add('driver-item');
    driverDiv.appendChild(newDriver);
    // create the li for cx #
    const newCx = document.createElement('li');
    newCx.innerText = cxInput.value;
    newCx.classList.add('cx-item');
    driverDiv.appendChild(newCx);
    // create the li for van #
    const newVan = document.createElement('li');
    newVan.innerText = vanInput.value;
    newVan.classList.add('cx-item');
    driverDiv.appendChild(newVan);
    // delete button
    const deleteDriver = document.createElement('button');
    deleteDriver.innerHTML = '<i class="fas fa-times-circle"></i>';
    deleteDriver.classList.add('delete')
    driverDiv.appendChild(deleteDriver);
    // append to list
    driverList.appendChild(driverDiv);
    // clear input area
    driverInput.value = '';
    cxInput.value = '';
    vanInput.value = '';

}