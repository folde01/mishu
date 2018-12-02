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

function addDummyNotes() {
    var date = new Date('December 17, 1995 03:24:00');
    var content = `This is note 1. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
    Phasellus viverra facilisis scelerisque. Quisque sed dapibus lacus. Duis purus mauris,
    rutrum nec turpis ut, bibendum malesuada augue. Nam eget nunc eu quam cursus pulvinar. 
    Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec rutrum lobortis fermentum.
    Sed nec ipsum ut ante vestibulum euismod.
    
    Blah blah rutrum nec turpis ut, bibendum malesuada augue. Nam eget nunc eu quam cursus pulvinar. 
    Interdum et malesuada fames ac ante ipsum primis in faucibus. Donec rutrum lobortis fermentum.
    Sed nec ipsum ut ante vestibulum euismod foo foo.

    Aliquam quis erat diam. Duis id enim eget dui maximus efficitur in vel velit. Aenean 
    aliquet at lacus at rutrum. Sed justo mauris, gravida nec aliquet ut, semper sed ligula. 
    Nulla facilisi. Praesent pulvinar egestas est, et tempor dui vehicula vitae. Aliquam egestas 
    eros nec lectus elementum hendrerit.`;
    note = new Note(date, content);
    notes.push(note);

    var date = new Date('January 17, 2015 13:44:04');
    var content =
        `This is note 2. Maecenas porta orci nec elit placerat, a mollis tortor euismod. Donec malesuada 
    commodo tortor vitae scelerisque.

    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer massa orci, accumsan quis facilisis quis, consectetur vel velit. Duis convallis mauris et lacinia vestibulum. Sed blandit, velit at fermentum placerat, nulla nulla efficitur magna, vel tempor lectus mi sed felis. Cras lorem ipsum, faucibus ut risus at, laoreet maximus purus. Morbi ipsum nisi, elementum eleifend tempus sed, euismod vel ipsum. Morbi in venenatis enim, nec semper diam. Quisque varius nulla nec finibus cursus.

Vivamus rutrum odio vitae purus molestie, a mattis mauris condimentum. Nulla commodo aliquet accumsan. Sed nec dictum magna. Nulla consectetur id sapien non mattis. Morbi ornare pharetra purus ut dapibus. Cras sem nisi, maximus nec dictum et, venenatis in erat. Sed congue odio sem, id consectetur ante faucibus sit amet. Pellentesque et erat sit amet quam sagittis ultrices.

Fusce bibendum lorem consectetur ligula aliquet, sed pharetra lectus fermentum. Sed sit amet consectetur neque, eget sollicitudin tortor. Ut ultrices nunc sed mauris porttitor, eu gravida nulla dictum. Donec vehicula mi nec metus pulvinar efficitur ut et tortor. Donec turpis nisl, vulputate id congue in, facilisis vel nisi. Nullam eu faucibus lectus. Proin tincidunt magna nec diam mattis euismod in eget diam. Quisque tristique, sapien vitae tincidunt scelerisque, massa est sagittis ante, a consectetur ligula quam nec ante.

Integer varius pellentesque tortor, a feugiat enim sodales et. Donec nec nisl vel magna semper rutrum vitae a ex. Praesent id justo convallis, semper velit ut, euismod ante. Maecenas non augue lorem. Maecenas malesuada tincidunt ipsum, eu euismod leo commodo quis. Nulla facilisi. Pellentesque luctus ligula ornare feugiat tempus. Duis sed magna massa.

Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis vel ex quis sem bibendum sodales. Fusce porta aliquet nulla a rutrum. Nullam vel pretium risus. Pellentesque suscipit purus urna, ac tristique lectus pellentesque ut. Donec eleifend elit leo, at cursus leo egestas vitae. Phasellus aliquam auctor erat eu dignissim. Curabitur interdum tristique libero eu ultrices. Duis suscipit tristique diam sed sollicitudin. Curabitur feugiat convallis dui vitae consequat. Mauris interdum orci vel sem pretium, vitae imperdiet metus aliquet. Donec varius dui orci, non egestas velit vulputate eget. Aenean non dictum massa, id egestas neque. Cras faucibus quam at erat egestas, sed convallis dui interdum. Etiam suscipit neque eu velit finibus, id congue augue egestas.
    `;
    note = new Note(date, content);
    notes.push(note);

    var date = new Date('January 17, 2018 11:11:11');
    var content =
        `This is note 3. skdjflkajs fk jdsflkjs kfj sakjflkdsj f just a short one`;
    note = new Note(date, content);
    notes.push(note);
}
function enterViewMode() {
    // sets up viewing
    noteInput.value = "";

    newNoteButton.classList.add('displayed');

    if (notes.length > 1) {
        sortByDateAscendingButton.classList.add('displayed');
    }
    noteInput.classList.remove('displayed');
    //notesDisplay.style.display = 'block';

    saveNewNoteButton.classList.remove('displayed');
    saveUpdatedNoteButton.classList.remove('displayed');
    deleteButton.classList.remove('displayed');
    cancelButton.classList.remove('displayed');

    notes.sort(function (a, b) { return b.date - a.date });
    notesDisplayParent = notesDisplay.parentNode;
    newNotesDisplay = document.createElement('ul');
    notes.forEach(function (note) {
        newNotesDisplay.appendChild(note.getLI());
    });
    notesDisplayParent.replaceChild(newNotesDisplay, notesDisplay);
    newNotesDisplay.setAttribute('id', 'notesDisplay');
    notesDisplay = newNotesDisplay;
    notesDisplay.classList.add('displayed');
}

function enterNewNoteMode() {
    newNoteButton.classList.remove('displayed');
    sortByDateAscendingButton.classList.remove('displayed');
    sortByDateDescendingButton.classList.remove('displayed');
    noteInput.classList.add('displayed');
    saveNewNoteButton.classList.add('displayed');
    cancelButton.classList.add('displayed');
    notesDisplay.classList.remove('displayed');

}

function enterEditMode(li) {
    // invisible
    newNoteButton.classList.remove('displayed');
    sortByDateAscendingButton.classList.remove('displayed');
    sortByDateDescendingButton.classList.remove('displayed');
    notesDisplay.classList.remove('displayed');
    noteInput.classList.add('displayed');
    saveUpdatedNoteButton.classList.add('displayed');
    deleteButton.classList.add('displayed');
    cancelButton.classList.add('displayed');

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
    getPreviewText() {
        return this.content.slice(0,200) + ' . . .';
    }
    getHtmlID() {
        return 'note-' + this.id;
    }
    getLI() {
        var li = document.createElement('li');

        var dateSpan = document.createElement('span');
        dateSpan.setAttribute('class', 'date');
        var dateOptions = {
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: 'numeric',
            month: 'short',
            year: 'numeric'
        }
        var dateString = this.date.toLocaleDateString('en-GB', dateOptions);
        dateSpan.appendChild(document.createTextNode(dateString));

        li.appendChild(dateSpan);
        var p = document.createElement('p');
        li.appendChild(p);

        p.appendChild(document.createTextNode(this.getPreviewText()));
        li.setAttribute('id', this.getHtmlID());
        li.setAttribute('class', 'note');
        li.addEventListener('click', function () {
            enterEditMode(li);
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

saveNewNoteButton.addEventListener('click', function () {
    var note = new Note(new Date(), noteInput.value);
    note.save();
    enterViewMode();
});

saveUpdatedNoteButton.addEventListener('click', function () {
    var noteID = Note.getNoteIdFromLI(liBeingEdited);
    var note = null;
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === noteID) {
            note = notes[i];
        }
    }

    // only update if note has changed
    if (note.content !== noteInput.value) {
        note.content = noteInput.value;
        note.date = new Date();
    }
    enterViewMode();
});

deleteButton.addEventListener('click', function () {
    var noteID = Note.getNoteIdFromLI(liBeingEdited);
    for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === noteID) {
            notes.splice(i, 1);
        }
    }
    enterViewMode();
});

newNoteButton.addEventListener('click', function () {
    enterNewNoteMode();
});

cancelButton.addEventListener('click', function () {
    enterViewMode();
});

sortByDateAscendingButton.addEventListener('click', function () {
    notes.sort(function (a, b) { return a.date - b.date });
    notesDisplayParent = notesDisplay.parentNode;
    newNotesDisplay = document.createElement('ul');
    notes.forEach(function (note) {
        newNotesDisplay.appendChild(note.getLI());
    });
    notesDisplayParent.replaceChild(newNotesDisplay, notesDisplay);
    newNotesDisplay.setAttribute('id', 'notesDisplay');
    notesDisplay = newNotesDisplay;
    notesDisplay.classList.add('displayed');
    sortByDateAscendingButton.classList.remove('displayed');
    sortByDateDescendingButton.classList.add('displayed');
});

sortByDateDescendingButton.addEventListener('click', function () {
    notes.sort(function (a, b) { return b.date - a.date });
    notesDisplayParent = notesDisplay.parentNode;
    newNotesDisplay = document.createElement('ul');
    notes.forEach(function (note) {
        newNotesDisplay.appendChild(note.getLI());
    });
    notesDisplayParent.replaceChild(newNotesDisplay, notesDisplay);
    newNotesDisplay.setAttribute('id', 'notesDisplay');
    notesDisplay = newNotesDisplay;
    notesDisplay.classList.add('displayed');
    sortByDateAscendingButton.classList.add('displayed');
    sortByDateDescendingButton.classList.remove('displayed');
});

addDummyNotes();
enterViewMode();
