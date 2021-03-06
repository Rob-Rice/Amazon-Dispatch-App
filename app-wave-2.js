// ----------------- Date ----------------- 
let date = document.querySelector('.date');
let today = new Date();
let day = `${today.getDate() < 10 ? '0' : ""}${today.getDate()}`;
let month = `${(today.getMonth() + 1) < 10 ? '0' : ""}${today.getMonth() + 1}`;
let year = today.getFullYear();

// date at top of page
date.textContent = `${day}/${month}/${year}`;

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
        const driversTwo = Store.getDriversTwo();

        driversTwo.forEach((name) => UI.addDriverToList(name));
    }

    static addDriverToList(name) {
        const list = document.querySelector('#driver-list-2');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td><button type="submit" class="btn delete vivify pullDown">X</button></td>

        <td class="drivers-name vivify pullDown">${name.driver}</td>
        <td class="drivers-cx vivify pullDown">${name.cx}</td>
        <td class="drivers-van vivify pullDown">${name.van}</td>
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
        document.querySelector('#driver-input-2').value = '';
        document.querySelector('#cx-input').value = '';
        document.querySelector('#van-input').value = '';
    }
}

// storage
class Store {
    static getDriversTwo () {
        let driversTwo;
        if(localStorage.getItem('drivers-two') === null) {
            driversTwo = [];
        } else {
            driversTwo = JSON.parse(localStorage.getItem('drivers-two'));
        }

        return driversTwo;
    }

    static addDriver(driver) {
        const driversTwo = Store.getDriversTwo();

        driversTwo.push(driver);

        localStorage.setItem('drivers-two', JSON.stringify(driversTwo));
    }

    static removeDriver(employee) {
        const driversTwo = Store.getDriversTwo();

        driversTwo.forEach((driver, index) => {
            if(driver.employee === employee) {
                driversTwo.splice(index, 1);
            }
        });

        localStorage.setItem('drivers-two', JSON.stringify(driversTwo));
    }
}


// display drivers
document.addEventListener('DOMContentLoaded', UI.displayDrivers);

// add driver
document.querySelector('#driver-form').addEventListener('submit', (event) => {
    // prevent form from submitting
    event.preventDefault();
    // get form values 
    const driverName = document.querySelector('#driver-input-2').value;
    const cx = document.querySelector('#cx-input').value;
    const van = document.querySelector('#van-input').value;

    // validate
    if(driverName === '' || cx === '' || van === '') {
        UI.showAlert('Please fill in all fields');
    } else {
        // instatiate driver
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
document.querySelector('#driver-list-2').addEventListener('click', (e) => {
    // remove driver from UI
    UI.deleteDriver(e.target);

    // remove driver from storage
    Store.removeDriver(e.target.parentElement.remove());
});

// ----------------- van counter ----------------- 
let count = localStorage.getItem('van-number-2') || 0
document.querySelector('.number').innerText = count
const form = document.querySelector('.form-one');
const vanNumber = document.getElementById('value');


form.addEventListener('submit', (e) => {
    // adding van number
    const add = document.querySelectorAll('.drivers-name');
    // no vans add if reuiered fields arent met 
    const no = document.querySelector('.alert-message');
    if (add) {
        count++;
    } if (no) {
        count--;
    }  

    vanNumber.textContent = count;
    localStorage.setItem('van-number-2', count)
});

const table = document.querySelector('.table')

table.addEventListener('click', (e) => {
    // subtracting van number
    const btn = e.target.classList;
    if(btn.contains('delete')){
        count--;
    } if (btn.contains('none')) {
        return
    }

    vanNumber.textContent = count;
    localStorage.setItem('van-number-2', count)
});

// ----------------- notes storage ----------------- 
const notesInput = document.getElementById('note-input');
const notesBtn = document.getElementById('add-btn');
const notesAdded = document.querySelector('.added-notes');

document.addEventListener('DOMContentLoaded', getNotes);

// add notes
notesBtn.addEventListener('click', addNote)

function addNote (ev) {
    // prevent form from submitting
    ev.preventDefault()
    // note dive
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('noteDiv');
    // adding note to local storage
    saveNotes(notesInput.value)
    // create note li
    const newNote = document.createElement('li');
    newNote.innerText = notesInput.value;
    newNote.classList.add('note-item');
    noteDiv.appendChild(newNote);
    // strike through button
    const completedNote = document.createElement('button');
    completedNote.innerHTML = '<i class="far fa-dot-circle"></i>';
    completedNote.classList.add('completed-btn');
    noteDiv.appendChild(completedNote);
    // delete button
    const deleteNotes = document.createElement('button');
    deleteNotes.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteNotes.classList.add('trash-btn');
    noteDiv.appendChild(deleteNotes);
    // append to list
    notesAdded.appendChild(noteDiv)
    // return value in input to nothing after submit
    notesInput.value = '';
}

// delete and check notes
notesAdded.addEventListener('click', deleteCheck);

function deleteCheck(e) {
    const item = e.target;
    // delete
    if(item.classList[0] === 'trash-btn') {
        const note = item.parentElement;
        removeNotes(note)
        note.remove();
    }
    // strike through
    if(item.classList[0] === 'completed-btn') {
        const note = item.parentElement;
        note.classList.toggle('completed');
    }
}


// saving notes
function saveNotes(note) {
    let notes;
    if(localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes')); 
    }

    notes.push(note);
    localStorage.setItem('notes', JSON.stringify(notes));
}

// notes storage to UI
function getNotes() {
    let notes;
    if(localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes')); 
    }
    notes.forEach(function(note) {
    // note dive
    const noteDiv = document.createElement('div');
    noteDiv.classList.add('noteDiv');
    // create note li
    const newNote = document.createElement('li');
    newNote.innerText = note;
    newNote.classList.add('note-item');
    noteDiv.appendChild(newNote);
    // strike through button
    const completedNote = document.createElement('button');
    completedNote.innerHTML = '<i class="far fa-dot-circle"></i>';
    completedNote.classList.add('completed-btn');
    noteDiv.appendChild(completedNote);
    // delete button
    const deleteNotes = document.createElement('button');
    deleteNotes.innerHTML = '<i class="fas fa-trash-alt"></i>';
    deleteNotes.classList.add('trash-btn');
    noteDiv.appendChild(deleteNotes);
    // append to list
    notesAdded.appendChild(noteDiv)
    })
}

// notes storage to UI
function removeNotes(note) {
    let notes;
    if(localStorage.getItem('notes') === null) {
        notes = [];
    } else {
        notes = JSON.parse(localStorage.getItem('notes')); 
    }
    const noteIndex = note.children[0].innerText;
    notes.splice(notes.indexOf(noteIndex), 1);
    localStorage.setItem('notes', JSON.stringify(notes)); 
}