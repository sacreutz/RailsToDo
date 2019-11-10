class Notes {
  constructor() {
    this.notes = []
    this.adapter = new NotesAdapter()
    this.initBindingsAndEventListeners()
    this.fetchAndLoadNotes()
  }

  initBindingsAndEventListeners() {
    this.notesContainer = document.getElementById('notes-container')
    this.body = document.querySelector('body')
    this.newNoteBody = document.getElementById('new-note-body')
    this.noteForm = document.getElementById('new-note-form')
    this.noteForm.addEventListener('submit', this.createNote.bind(this))
    this.notesContainer.addEventListener('dblclick', this.handleNoteClick.bind(this))
    this.body.addEventListener('blur', this.updateNote.bind(this), true)

  }

  createNote(e) {
    e.preventDefault()
    console.log('note being created')
    const value = this.newNoteBody.value
    this.adapter.createNote(value).then(note => {
      this.notes.push(new Note(note))
      this.newNoteBody.value = ''
      this.render()
    })

  }

  handleNoteClick(e){


    this.toggleNote(e)
  }

  toggleNote(e) {
    console.log('double clicked')
    const li = e.target
    li.contentEditable = true
    li.focus()
    li.classList.add('editable')
  }

  updateNote(e) {
    console.log('updating note')
    const li = e.target
    li.contentEditable = false
    li.classList.remove('editable')
    const newValue = li.innerHTML
    const id = li.dataset.id
    this.adapter.updateNote(newValue, id)


  }

  fetchAndLoadNotes() {
    this.adapter
    .getNotes()
    .then(notes => {
      console.log(notes)
      notes.sort((a, b) => a.id - b.id).forEach(note => this.notes.push(new Note(note)))

    })
    .then(() => {
      this.render()
    })
  }

  render() {
    const notesString = this.notes.map(note => note.renderLi()).join('')
    this.notesContainer.innerHTML = notesString
  }

}
