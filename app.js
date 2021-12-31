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
const addBtn = document.querySelector('.add-btn');




// date at top of page
date.textContent = `${day}/${month}/${year}`;

// ----------------- functions ----------------- 

// van number counter
// btns.forEach(btn => {
//     btn.addEventListener('click', (e) => {
//         e.preventDefault(); // stop form from submitting
//         const styles = e.currentTarget.classList;
//         if(styles.contains('delete')) { // subtracting to count
//             count--;
//         } else if (styles.contains('increase')) { // add from count 
//             count++;
//         } 

//         value.textContent = count;
//     });
// });


class Driver {
    constructor(driver, cx, van) {
      this.driver = driver;
      this.cx = cx;
      this.van = van;
    }
    }

    // UI Class: Handle UI Tasks
    class UI {
    static displayDrivers() {
        const drivers = [
                    {
                        driver: 'Roberto Rice',
                        cx: '144',
                        van: '33'
                    },
                    {
                        driver: 'Rob Rice',
                        cx: '14',
                        van: 'R 33'
                    }
                ];

        drivers.forEach((name) => UI.addDriverToList(name));
    }

    static addDriverToList(name) {
        const list = document.querySelector('#driver-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td><a href="#" class="btn delete">X</a></td>
        <td class="drivers-name">${name.driver}</td>
        <td class="drivers-cx">${name.cx}</td>
        <td class="drivers-van">${name.van}</td>
        `;

        list.appendChild(row);
    }

    static deleteDriver(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    } 

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className= `alert-message`;
        div.appendChild(document.createTextNode(message));
        const body = document.querySelector('.body');
        const form = document.querySelector('#driver-form');
        body.insertBefore(div, form);
    }

    static clearFields() {
        document.querySelector('#driver-input').value = '';
        document.querySelector('#cx-input').value = '';
        document.querySelector('#van-input').value = '';
    }
}

document.addEventListener('DOMContentLoaded', UI.displayDrivers);

// add driver
document.querySelector('#driver-form').addEventListener('submit', (event) => {
    // prevent form from submitting
    event.preventDefault();
    // get form values 
    const driverName = document.querySelector('#driver-input').value;
    const cx = document.querySelector('#cx-input').value;
    const van = document.querySelector('#van-input').value;

    // validate
    if(driverName === '' || cx === '' || van === '') {
        // alert('Please fill in all fields');
        UI.showAlert('Please fill in all fields');
    } else {
        // instatiate book
        const driver = new Driver(driverName, cx, van);

        // add add to ui
        UI.addDriverToList(driver);

        // clear fields 
        UI.clearFields();
    }

    // // instatiate book
    // const driver = new Driver(driverName, cx, van);

    // // add add to ui
    // UI.addDriverToList(driver);

    // // clear fields 
    // UI.clearFields();
});


// remove driver
document.querySelector('#driver-list').addEventListener('click', (e) => {
    UI.deleteDriver(e.target);
});