//potential features to add: sort, search, tags, trash, links, attachments, formatting, preview, tabs, persistence, import/export, login, sub-notes, relate

var newNoteButton = document.getElementById('newNote');
var sortByDateAscendingButton = document.getElementById('sortByDateAscending');
var sortByDateDescendingButton = document.getElementById('sortByDateDescending');
var noteInput = document.getElementById('noteInput');
var saveNewNoteButton = document.getElementById('saveNewNoteButton');
var saveUpdatedNoteButton = document.getElementById('saveUpdatedNoteButton');
var deleteButton = document.getElementById('deleteButton');
var cancelButton = document.getElementById('cancelButton');
var notesDisplay = document.getElementById('notesDisplay');
var liBeingEdited = null;
var notes = [];

function initWindow() {
    noteInput.value = "";

    newNoteButton.style.display = 'inline';
    if (notes.length > 1) {
        sortByDateAscendingButton.style.display = 'inline';
    }
    noteInput.style.display = 'none';
    saveNewNoteButton.style.display = 'none';
    saveUpdatedNoteButton.style.display = 'none';
    deleteButton.style.display = 'none';
    cancelButton.style.display = 'none';
    notesDisplay.style.display = 'block';

    notes.sort(function(a, b) {return b.date - a.date});
    notesDisplayParent = notesDisplay.parentNode;
    newNotesDisplay = document.createElement('ul');
    notes.forEach(function(note){
        newNotesDisplay.appendChild(note.getLI());
    }); 
    notesDisplayParent.replaceChild(newNotesDisplay, notesDisplay);
    newNotesDisplay.setAttribute('id', 'notesDisplay');
    notesDisplay = newNotesDisplay;
}


function editNote(li){
    notesDisplay.style.display = 'none';
    newNoteButton.style.display = 'none';
    sortByDateAscendingButton.style.display = 'none';
    sortByDateDescendingButton.style.display = 'none';
    noteInput.style.display = 'inline';
    saveUpdatedNoteButton.style.display = 'inline';
    deleteButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    var p = li.childNodes[1];
    noteInput.value = p.textContent;
    liBeingEdited = li;
}

class Note {
    constructor(date, content) {
        this.id = Note.generateID();
        this.date = date;
        this.content = content;
    }
    save() {
        notes.push(this);
    } 
    getHtmlID() {
        return 'note-' + this.id;
    }
    getLI(){
        var li = document.createElement('li');

        var dateSpan = document.createElement('span');
        dateSpan.setAttribute('class', 'date');
        var dateOptions = { hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                day: 'numeric',
                month: 'short',
                year: 'numeric' }
        var dateString = this.date.toLocaleDateString('en-GB', dateOptions);
        dateSpan.appendChild(document.createTextNode(dateString));

        li.appendChild(dateSpan);
        var p = document.createElement('p');
        li.appendChild(p);

        p.appendChild(document.createTextNode(this.content));
        li.setAttribute('id', this.getHtmlID());
        li.setAttribute('class', 'note');
        li.addEventListener('click', function(){
            editNote(li);
        });

        return li;
    }
    static generateID() {
        return Note.nextID++;
    }
    static getNoteIdFromHtmlID(htmlID) {
        return Number(htmlID.split('-')[1]);
    };
    static getNoteIdFromLI(li) {
       var htmlID = li.getAttribute('id');
       return Note.getNoteIdFromHtmlID(htmlID);
    }
}
Note.nextID = 1;

saveNewNoteButton.addEventListener('click', function(){
    var note = new Note(new Date(), noteInput.value);
    note.save();
    initWindow();
});

saveUpdatedNoteButton.addEventListener('click', function(){
    var noteID = Note.getNoteIdFromLI(liBeingEdited);
    var note = null;
    for (var i=0; i<notes.length; i++) {
        if (notes[i].id === noteID) {
            note = notes[i];
        }
    }

    // only update if note has changed
    if (note.content !== noteInput.value) {
        note.content = noteInput.value;
        note.date = new Date();
    }
    initWindow();
});

deleteButton.addEventListener('click', function(){
    var noteID = Note.getNoteIdFromLI(liBeingEdited);
    for (var i=0; i<notes.length; i++) {
        if (notes[i].id === noteID) {
            notes.splice(i, 1);
        }
    }
    initWindow();
});

newNoteButton.addEventListener('click', function(){
    newNoteButton.style.display = 'none';
    noteInput.style.display = 'inline';
    saveNewNoteButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    notesDisplay.style.display = 'none';
});

cancelButton.addEventListener('click', function(){
    initWindow();
});

sortByDateAscendingButton.addEventListener('click', function(){
    notes.sort(function(a, b) {return a.date - b.date});
    notesDisplayParent = notesDisplay.parentNode;
    newNotesDisplay = document.createElement('ul');
    notes.forEach(function(note){
        newNotesDisplay.appendChild(note.getLI());
    }); 
    notesDisplayParent.replaceChild(newNotesDisplay, notesDisplay);
    newNotesDisplay.setAttribute('id', 'notesDisplay');
    notesDisplay = newNotesDisplay;
    sortByDateDescendingButton.style.display = 'inline';
    sortByDateAscendingButton.style.display = 'none';
});

sortByDateDescendingButton.addEventListener('click', function(){
    notes.sort(function(a, b) {return b.date - a.date});
    notesDisplayParent = notesDisplay.parentNode;
    newNotesDisplay = document.createElement('ul');
    notes.forEach(function(note){
        newNotesDisplay.appendChild(note.getLI());
    }); 
    notesDisplayParent.replaceChild(newNotesDisplay, notesDisplay);
    newNotesDisplay.setAttribute('id', 'notesDisplay');
    notesDisplay = newNotesDisplay;
    sortByDateDescendingButton.style.display = 'none';
    sortByDateAscendingButton.style.display = 'inline';
});