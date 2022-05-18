const assetpath = "../../assets/assignment05_images/"
const filterdropdown = document.querySelector('#filterdropdown')
const notesContainer = document.querySelector('#notes-container')
const newItemButton = document.querySelector('#add-new')
const newItemForm = document.querySelector('#new-item-form form')
const editItemForm = document.querySelector('#edit-item-form form')
const saveItemButton = document.querySelector('#save-item')
const itemSummary = document.querySelector('#item-summary')
const cancelItemButton = document.querySelector('#cancel-item')
const saveEdit = document.querySelector('#save-edit-item')
const cancelEdit = document.querySelector('#cancel-edit-item')
const closeSummary = document.querySelector('#closesummary')
const errorMsg = document.querySelector('.error')
let noteId = 1;

function createLR(parent) {
    let leftBtn = document.createElement('button')
    let rightBtn = document.createElement('button')
    let leftImg = document.createElement('img')
    leftImg.src = assetpath + 'left_button.png'
    let rightImg = document.createElement('img')
    rightImg.src = assetpath + 'right_button.png'
    leftBtn.classList.add('move-item-left')
    rightBtn.classList.add('move-item-right')
    leftBtn.appendChild(leftImg)
    rightBtn.appendChild(rightImg)
    parent.appendChild(leftBtn)
    parent.appendChild(rightBtn)
    leftBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        notesContainer.insertBefore(leftBtn.parentElement, leftBtn.parentElement.previousElementSibling)
        handleLR()
    })
    rightBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        let next = rightBtn.parentElement.nextElementSibling.nextElementSibling
        if(next) {
            notesContainer.insertBefore(rightBtn.parentElement, next)
        } else {
            rightBtn.parentElement.remove()
            notesContainer.appendChild(rightBtn.parentElement)
        }
    handleLR()
    })
}

function createNote(title, category, description) {
    let note = document.createElement('article')
    note.classList.add("note", category)
    note.id = "note-" + noteId++
    note.draggable = "true"
    note.clickable = "true"
    note.textContent = title
    note.dataset.itemTitle = title
    note.dataset.itemSeason = category
    note.dataset.itemDescription = description
    note.dataset.completion = 'incomplete'
    note.dataset.creationTime = new Date().toLocaleString()
    note.dataset.lastAccess = new Date().toLocaleString()
    let deleteBtn = document.createElement('button')
    let editBtn = document.createElement('button')
    let completionIndicator = document.createElement('img')
    completionIndicator.classList.add('checkmark', 'incomplete')
    completionIndicator.src = assetpath + "icons8-done.svg"
    let deleteImg = document.createElement('img')
    deleteImg.src = assetpath + 'delete_button.png'
    let editImg = document.createElement('img')
    editImg.src = assetpath + "edit_button.png"
    deleteBtn.classList.add('delete-note')
    editBtn.classList.add('edit-item')
    deleteBtn.appendChild(deleteImg)
    editBtn.appendChild(editImg)
    note.insertBefore(completionIndicator, note.firstChild)
    note.appendChild(deleteBtn)
    note.appendChild(editBtn)
    createLR(note)
    note.addEventListener('dragstart', handleDragStart);
    note.addEventListener('dragover', handleDragOver);
    note.addEventListener('dragenter', handleDragEnter);
    note.addEventListener('dragleave', handleDragLeave);
    note.addEventListener('dragend', handleDragEnd);
    note.addEventListener('drop', handleDrop);
    deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        deleteBtn.parentElement.remove()
        handleLR()
    })
    completionIndicator.addEventListener('click', (e) => {
        e.stopPropagation()
        completionIndicator.classList.toggle('incomplete')
        let source = completionIndicator.src.split('/')
        completionIndicator.src = source[source.length-1] == "icons8-done.svg" ? assetpath + 'icons8-done-checked.svg' : assetpath + 'icons8-done.svg'
        let datastatus = completionIndicator.parentElement.dataset.completion
        completionIndicator.parentElement.dataset.completion = datastatus == "incomplete" ? "completed" : "incomplete"
    })
    editBtn.addEventListener('click', (e) => {
        e.stopPropagation()
        editBtn.parentElement.dataset.lastAccess = new Date().toLocaleString()
        handleEdit(editBtn.parentElement.dataset, editBtn.parentElement)
    })
    note.addEventListener('click', (e) => {
        let noteEl = e.target
        noteEl.dataset.lastAccess = new Date().toLocaleString()
        showSummary(noteEl.dataset)
    })

    return note
}

function handleEdit(data, parent) {
    editItemForm.parentElement.classList.remove('hide')
    editItemForm.parentElement.querySelector('h2').textContent = "Editing " + data.itemTitle
    editItemForm.title.value = data.itemTitle
    editItemForm.category.value = data.itemSeason
    editItemForm.description.value = data.itemDescription
    editItemForm.dataset.currentNote = parent.id
}

function showSummary(data) {
    itemSummary.classList.remove('hide')
    let titlecase = data.itemSeason.charAt(0).toUpperCase() + data.itemSeason.slice(1)
    itemSummary.querySelector('h2').textContent = data.itemTitle
    itemSummary.querySelector('#season').textContent = "Season: " + titlecase
    itemSummary.querySelector('#description').textContent = data.itemDescription
    itemSummary.querySelector('#created').textContent = "Created: " + data.creationTime
    itemSummary.querySelector('#lastAccessed').textContent = "Last Accessed: " + data.lastAccess
}

function handleDragStart() {
    this.style.opacity = '0.4';

    dragSrcEl = this;
}

function handleDragEnd() {
    this.style.opacity = '1'
    let allNotes = [...notesContainer.children]
    allNotes.forEach(item => {
      item.classList.remove('over')
    })
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault()
    }

    return false;
}

function handleDragEnter() {
    this.classList.add('over')
}

function handleDragLeave() {
    this.classList.remove('over')
}

function handleDrop(e) {
    e.stopPropagation()
    if (dragSrcEl !== this) {
        let next = this.nextSibling
        if(next === dragSrcEl) {
            this.parentElement.insertBefore(dragSrcEl, this)
        } else {
            this.parentElement.insertBefore(this, dragSrcEl)
            if(next) {
                this.parentElement.insertBefore(dragSrcEl, next)
            } else {
                this.parentElement.appendChild(dragSrcEl)
            }
        }
    }
    handleLR()
    return false;
}

function handleLR() {
    for(let note of notesContainer.children) {
        note.querySelector('.move-item-left').classList.remove('hide')
        note.querySelector('.move-item-right').classList.remove('hide')
    }
    let firstleft = notesContainer.firstElementChild.querySelector('.move-item-left')
    let lastright = notesContainer.lastElementChild.querySelector('.move-item-right')
    firstleft.classList.add('hide')
    lastright.classList.add('hide')
}

function filterNotes(targetVal) {
    for(let note of notesContainer.children) {
        note.classList.remove('hide')
        if(targetVal == "all") {
            continue
        } else if(targetVal == "completed" || targetVal == "incomplete") {
            if(note.dataset.completion != targetVal) {
                note.classList.add('hide')
            }
        } else {
            if(note.dataset.itemSeason != targetVal) {
                note.classList.add('hide')
            }
        }
    }
}

newItemButton.addEventListener('click', () => {
    newItemForm.parentElement.classList.remove("hide")
    filterdropdown.value = "all"
    filterNotes("all")
})

saveItemButton.addEventListener('click', (e) => {
    e.preventDefault()
    let title = newItemForm.title.value
    let category = newItemForm.category.options[newItemForm.category.selectedIndex].value
    let description = newItemForm.description.value
    let newNote
    if(title && category && description) {
        newNote = createNote(title, category, description)
        notesContainer.appendChild(newNote)
        newItemForm.reset()
        newItemForm.parentElement.classList.add('hide')
        errorMsg.classList.add('hide')
    } else {
        errorMsg.classList.remove('hide')
    }
    handleLR()
})

cancelItemButton.addEventListener('click', (e) => {
    e.preventDefault()
    newItemForm.reset()
    newItemForm.parentElement.classList.add('hide')
    errorMsg.classList.add('hide')
})

saveEdit.addEventListener('click', (e) => {
    e.preventDefault()
    let currentNote = document.querySelector(`#${saveEdit.parentElement.dataset.currentNote}`)
    if(editItemForm.title.value && editItemForm.description.value) {
        currentNote.childNodes[1].textContent = editItemForm.title.value
        currentNote.dataset.itemTitle = editItemForm.title.value
        currentNote.dataset.itemSeason = editItemForm.category.value
        currentNote.dataset.itemDescription = editItemForm.description.value
        currentNote.classList.remove('winter', 'summer', 'spring', 'fall')
        currentNote.classList.add(editItemForm.category.value)
        editItemForm.parentElement.querySelector('.error').classList.add('hide')
        editItemForm.dataset.currentNote = ""
        editItemForm.parentElement.classList.add('hide')
        filterNotes(filterdropdown.value)
    } else {
        editItemForm.parentElement.querySelector('.error').classList.remove('hide')
    }
})

cancelEdit.addEventListener('click', (e) => {
    e.preventDefault()
    editItemForm.dataset.currentNote = ""
    editItemForm.parentElement.classList.add('hide')
    editItemForm.parentElement.querySelector('.error').classList.add('hide')
})

closeSummary.addEventListener('click', () => {
    itemSummary.classList.add('hide')
})

filterdropdown.addEventListener('change', () => {
    filterNotes(filterdropdown.value)
})

