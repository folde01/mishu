var newNoteButton = document.getElementById('newNote');
var noteInput = document.getElementById('noteInput');
var saveNewNoteButton = document.getElementById('saveNewNoteButton');
var saveUpdatedNoteButton = document.getElementById('saveUpdatedNoteButton');
var deleteButton = document.getElementById('deleteButton');
var cancelButton = document.getElementById('cancelButton');
var notesDisplay = document.getElementById('notesDisplay');
var liBeingEdited = null;

function initWindow() {
    noteInput.value = "";
    newNoteButton.style.display = 'block';
    noteInput.style.display = 'none';
    saveNewNoteButton.style.display = 'none';
    saveUpdatedNoteButton.style.display = 'none';
    deleteButton.style.display = 'none';
    cancelButton.style.display = 'none';
    notesDisplay.style.display = 'block';
}

function editNote(li){
    notesDisplay.style.display = 'none';
    newNoteButton.style.display = 'none';
    noteInput.style.display = 'inline';
    saveUpdatedNoteButton.style.display = 'inline';
    deleteButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    var p = li.childNodes[1];
    noteInput.value = p.textContent;
    liBeingEdited = li;
}

function createNoteLI(){
    var li = document.createElement('li');

    var dateSpan = document.createElement('span');
    dateSpan.setAttribute('class', 'date');
    var dateOptions = { hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            day: 'numeric',
            month: 'short',
            year: 'numeric' }
    var now = new Date();
    var dateString = now.toLocaleDateString('en-GB', dateOptions);
    dateSpan.appendChild(document.createTextNode(dateString));

    li.appendChild(dateSpan);
    var p = document.createElement('p');
    li.appendChild(p);

    var noteText = noteInput.value;
    p.appendChild(document.createTextNode(noteText));
    li.setAttribute('class', 'note');
    li.addEventListener('click', function(){
        editNote(li);
    });
    return li;

}

saveNewNoteButton.addEventListener('click', function(){
    var li = createNoteLI();
    notesDisplay.insertBefore(li, notesDisplay.firstChild);
    //notesDisplay.appendChild(li);
    initWindow();
});


saveUpdatedNoteButton.addEventListener('click', function(){
    var li = createNoteLI();
    notesDisplay.insertBefore(li, notesDisplay.firstChild);
    notesDisplay.removeChild(liBeingEdited);
    liBeingEdited = null;
    initWindow();
});

deleteButton.addEventListener('click', function(){
    liBeingEdited.parentNode.removeChild(liBeingEdited);
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
