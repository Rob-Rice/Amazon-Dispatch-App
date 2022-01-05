// ----------------- Date ----------------- 
let date = document.querySelector('.date');
let today = new Date();
let day = `${today.getDate() < 10 ? '0' : ""}${today.getDate()}`;
let month = `${(today.getMonth() + 1) < 10 ? '0' : ""}${today.getMonth() + 1}`;
let year = today.getFullYear();

// date at top of page
date.textContent = `${day}/${month}/${year}`;

// ----------------- van counter ----------------- 
const value = document.getElementById('value');
const btns = document.querySelectorAll('.btn');
const addBtn = document.querySelector('.add-btn');
let count = 0;

btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault(); // stop form from submitting
        const styles = e.currentTarget.classList;
        if(styles.contains('delete')) { // subtracting to count
            count--;
        } else if (styles.contains('add-button')) { // add from count 
            count++;
        } 

        value.textContent = count;
    });
});

// ----------------- add & remove driver UI/storage ----------------- 
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
        const driversThree = Store.getDriversThree();

        driversThree.forEach((name) => UI.addDriverToList(name));
    }

    static addDriverToList(name) {
        const list = document.querySelector('#driver-list-3');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td><a href="#" class="btn delete">X</a></td>
        <td class="drivers-name">${name.driver}</td>
        <td class="drivers-cx">${name.cx}</td>
        <td class="drivers-van">${name.van}</td>
        `;

        list.appendChild(row);
    }
// delete driver
    static deleteDriver(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    } 

// error message
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className= `alert-message`;
        div.appendChild(document.createTextNode(message));
        const body = document.querySelector('.body');
        const form = document.querySelector('#driver-form');
        body.insertBefore(div, form);

        // vanish message
        setTimeout(() => document.querySelector('.alert-message').remove(),
        3000);
    }

// clear after entering a new driver 
    static clearFields() {
        document.querySelector('#driver-input-3').value = '';
        document.querySelector('#cx-input').value = '';
        document.querySelector('#van-input').value = '';
    }
}

// storage
class Store {
    static getDriversThree () {
        let driversThree;
        if(localStorage.getItem('drivers-three') === null) {
            driversThree = [];
        } else {
            driversThree = JSON.parse(localStorage.getItem('drivers-three'));
        }

        return driversThree;
    }

    static addDriver(driver) {
        const driversThree = Store.getDriversThree();

        driversThree.push(driver);

        localStorage.setItem('drivers-three', JSON.stringify(driversThree));
    }

    static removeDriver(employee) {
        const driversThree = Store.getDriversThree();

        driversThree.forEach((driver, index) => {
            if(driver.employee === employee) {
                driversThree.splice(index, 1);
            }
        });

        localStorage.setItem('drivers-three', JSON.stringify(driversThree));
    }
}


// display drivers
document.addEventListener('DOMContentLoaded', UI.displayDrivers);

// add driver
document.querySelector('#driver-form').addEventListener('submit', (event) => {
    // prevent form from submitting
    event.preventDefault();
    // get form values 
    const driverName = document.querySelector('#driver-input-3').value;
    const cx = document.querySelector('#cx-input').value;
    const van = document.querySelector('#van-input').value;

    // validate
    if(driverName === '' || cx === '' || van === '') {
        UI.showAlert('Please fill in all fields');
    } else {
        // instatiate book
        const driver = new Driver(driverName, cx, van);

        // add driver to store
        Store.addDriver(driver);

        // add driver to ui
        UI.addDriverToList(driver);

        // clear fields 
        UI.clearFields();
    }

});


// remove driver
document.querySelector('#driver-list-3').addEventListener('click', (e) => {
    // remove book from UI
    UI.deleteDriver(e.target);

    // remove driver from storage
    Store.removeDriver(e.target.parentElement.remove());
});
