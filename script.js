var newNoteButton = document.getElementById('newNote');
var noteInput = document.getElementById('noteInput');
var doneCreatingButton = document.getElementById('doneCreatingButton');
var doneUpdatingButton = document.getElementById('doneUpdatingButton');
var deleteButton = document.getElementById('deleteButton');
var cancelButton = document.getElementById('cancelButton');
var notesDisplay = document.getElementById('notesDisplay');
var liBeingEdited = null;

function editNote(li){
    notesDisplay.style.display = 'none';
    newNoteButton.style.display = 'none';
    noteInput.style.display = 'inline';
    doneUpdatingButton.style.display = 'inline';
    deleteButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    noteInput.value = li.textContent;
    liBeingEdited = li;
}

doneCreatingButton.addEventListener('click', function(){

    var li = document.createElement('li');
    var noteText = noteInput.value;
    li.appendChild(document.createTextNode(noteText));
    li.setAttribute('class', 'note');
    li.addEventListener('click', function(){
        editNote(li);
    });
    notesDisplay.appendChild(li);

    initWindow()
});

doneUpdatingButton.addEventListener('click', function(){
    var li = document.createElement('li');
    var noteText = noteInput.value;
    li.appendChild(document.createTextNode(noteText));
    li.setAttribute('class', 'note');
    li.addEventListener('click', function(){
        editNote(li);
    });

    liBeingEdited.parentNode.replaceChild(li, liBeingEdited);
    initWindow()
});

deleteButton.addEventListener('click', function(){
    liBeingEdited.parentNode.removeChild(liBeingEdited);
    initWindow();
})

newNoteButton.addEventListener('click', function(){
    newNoteButton.style.display = 'none';
    noteInput.style.display = 'inline';
    doneCreatingButton.style.display = 'inline';
    cancelButton.style.display = 'inline';
    notesDisplay.style.display = 'none';
})

cancelButton.addEventListener('click', function(){
    initWindow();
})

function initWindow() {
    noteInput.value = "";
    newNoteButton.style.display = 'block';
    noteInput.style.display = 'none';
    doneUpdatingButton.style.display = 'none';
    doneCreatingButton.style.display = 'none';
    deleteButton.style.display = 'none';
    cancelButton.style.display = 'none';
    notesDisplay.style.display = 'block';
}