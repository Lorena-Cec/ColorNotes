"use strict";
function addNote() {
    const noteContainer = document.getElementById('note');
    const containerRight = document.getElementById('container-right');
    containerRight.innerHTML = ''; 
    containerRight.appendChild(noteContainer);
    noteContainer.innerHTML = ''; 

    const titleElement = document.createElement('input');
    titleElement.type = "text";
    titleElement.name = "title-text"; 
    titleElement.placeholder = "Title";
    titleElement.id = 'note-title';
    titleElement.className = 'orange';
    noteContainer.appendChild(titleElement);

    const line = document.createElement('hr');
    noteContainer.appendChild(line);

    const textElement = document.createElement('textarea');
    textElement.placeholder = "Add your text here."; 
    textElement.id = 'note-text';
    noteContainer.appendChild(textElement);

    const saveButton = document.createElement('button');
    saveButton.classList = 'save-button button';
    saveButton.setAttribute("onclick", "createNote()");
    saveButton.innerHTML = "Save";
    containerRight.appendChild(saveButton);
}

function createNote() {
    const titleText = document.getElementById('note-title').value;
    const noteText = document.getElementById('note-text').value;

    console.log(titleText);

    if (noteText.trim() !== '') {

        var date = new Date();
        var time = new Date();

        const note = {
        id: new Date().getTime(),
        title: titleText,
        text: noteText,
        fullDate: new Date().toISOString(),
        date: date.toLocaleDateString(),
        time:  time.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'})
        };

        const existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
        existingNotes.push(note);

        localStorage.setItem('notes', JSON.stringify(existingNotes));

        document.getElementsByClassName('note-title').value = '';
        document.getElementsByClassName('note-text').value = '';

        displayNotes();
        displayNote(note.id);
    }
}


function displayNotes() {
    const notesList = document.getElementById('notes-list');
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.sort(function(a, b) {
        var c = new Date(a.fullDate);
        var d = new Date(b.fullDate);
        return d-c;
    });

    notes.forEach(note => {
        const listItem = document.createElement('li');
        listItem.setAttribute("id", note.id);
        listItem.setAttribute("onclick", "displayNote(this.id)");
        listItem.innerHTML = `
        <p>${note.title}</p>
        <p>${note.date}</p>
        `;
        notesList.appendChild(listItem);
    });
}

function displayNote(id) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id == id);

    if (note) {
        const noteContainer = document.getElementById('note');
        const containerRight = document.getElementById('container-right');
        containerRight.innerHTML = ''; 

        const textTime = document.createElement('p');
        textTime.className = 'note-time-display';
        textTime.innerHTML = note.time; 
        containerRight.appendChild(textTime);

        containerRight.appendChild(noteContainer);
        noteContainer.innerHTML = '';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = "buttons";
        containerRight.appendChild(buttonsContainer);
        buttonsContainer.innerHTML = '';

        const titleElement = document.createElement('p');
        if(note.title== undefined || note.title == ''){
            titleElement.textContent = "Title";
        }
        else{
            titleElement.textContent = note.title;
        }
        titleElement.className = 'note-title-display';
        noteContainer.appendChild(titleElement);

        const line = document.createElement('hr');
        noteContainer.appendChild(line);

        const textElement = document.createElement('p');
        textElement.innerHTML = note.text; 
        textElement.className = 'note-text-display';
        noteContainer.appendChild(textElement);

        const editButton = document.createElement('button');
        editButton.classList = 'edit-button button';
        editButton.addEventListener('click', () => editNote(note));
        editButton.innerHTML = "Edit";
        buttonsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList = 'delete-button button';
        deleteButton.addEventListener('click', () => deleteNote(note.id));
        deleteButton.innerHTML = "Delete";
        buttonsContainer.appendChild(deleteButton);
    }
}

function editNote(note){
    const noteContainer = document.getElementById('note');
    const containerRight = document.getElementById('container-right');
    containerRight.innerHTML = ''; 
    containerRight.appendChild(noteContainer);
    noteContainer.innerHTML = ''; 

    const titleElement = document.createElement('input');
    titleElement.type = "text";
    titleElement.name = "title-text"; 
    titleElement.value = note.title || "Title";
    titleElement.id = 'note-title';
    titleElement.className = 'orange';
    noteContainer.appendChild(titleElement);

    const line = document.createElement('hr');
    noteContainer.appendChild(line);

    const textElement = document.createElement('textarea');
    textElement.innerHTML = note.text || "Add text here.";
    textElement.id = 'note-text';
    noteContainer.appendChild(textElement);

    const saveButton = document.createElement('button');
    saveButton.classList = 'save-button button';
    saveButton.addEventListener('click', () => updateNote(note.id));
    saveButton.innerHTML = "Save";
    containerRight.appendChild(saveButton);
}


function updateNote(noteId){
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id == noteId);

    if (note) {
        const noteText = document.getElementById('note-text').value;
        const noteTitle = document.getElementById('note-title').value;

        var date = new Date();
        var time = new Date();

        note.title = noteTitle;
        note.text = noteText;
        note.fullDate = new Date().toISOString();
        note.date = date.toLocaleDateString();
        note.time = time.toLocaleTimeString([], {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit'});

        localStorage.setItem('notes', JSON.stringify(notes));
        
        displayNotes();
        displayNote(noteId);
    }
}

function deleteNote(noteId) {
    let notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes = notes.filter(note => note.id !== noteId);

    localStorage.setItem('notes', JSON.stringify(notes));
    displayNotes();
    addNote();
}


function searchNotes() {
    const notesList = document.getElementById('notes-list');
    const searchText = document.getElementById('search-text').value;
    const searchButton = document.getElementById('btn-search');
    const searchValue = searchText.toLowerCase().trim();
    console.log(searchValue);
    notesList.innerHTML = '';

    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.sort(function(a, b) {
        var c = new Date(a.fullDate);
        var d = new Date(b.fullDate);
        return d-c;
    });

    notes.forEach(note => {
        let result = note.text.includes(searchValue);
        if(result){
            const listItem = document.createElement('li');
            listItem.setAttribute("id", note.id);
            listItem.addEventListener('click', () => displayNoteSearch(note.id, searchValue));
            listItem.innerHTML = `
            <p>${note.title}</p>
            <p>${note.date}</p>
            `;
            notesList.appendChild(listItem);
        }        
    });
}

function displayNoteSearch(id, searchValue) {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    const note = notes.find(note => note.id == id);

    if (note) {
        const noteContainer = document.getElementById('note');
        const containerRight = document.getElementById('container-right');
        containerRight.innerHTML = ''; 

        const textTime = document.createElement('p');
        textTime.className = 'note-time-display';
        textTime.innerHTML = note.time; 
        containerRight.appendChild(textTime);

        containerRight.appendChild(noteContainer);
        noteContainer.innerHTML = '';

        const buttonsContainer = document.createElement('div');
        buttonsContainer.id = "buttons";
        containerRight.appendChild(buttonsContainer);
        buttonsContainer.innerHTML = '';

        const titleElement = document.createElement('p');
        if(note.title== undefined || note.title=='' ){
            titleElement.textContent = "undefined";
        }
        else{
            titleElement.textContent = note.title;
        }
        titleElement.className = 'note-title-display';
        noteContainer.appendChild(titleElement);
        console.log(note.title)
        const line = document.createElement('hr');
        noteContainer.appendChild(line);

        const noteText = note.text;
        let re = new RegExp(searchValue,"g"); 
        let newText = noteText.replace(re, `<span class="highlight">${searchValue}</span>`);

        const textElement = document.createElement('p');
        textElement.innerHTML = newText; 
        textElement.className = 'note-text-display';
        noteContainer.appendChild(textElement);

        const editButton = document.createElement('button');
        editButton.classList = 'edit-button button';
        editButton.addEventListener('click', () => editNote(note));
        editButton.innerHTML = "Edit";
        buttonsContainer.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.classList = 'delete-button button';
        deleteButton.addEventListener('click', () => deleteNote(note.id));
        deleteButton.innerHTML = "Delete";
        buttonsContainer.appendChild(deleteButton);
    }
}

displayNotes();