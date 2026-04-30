import { useEffect, useState } from "react"
import notesService from "./services/notes"

function App() {
  const [notes, setNotes] = useState([])

  useEffect(() => {
    notesService.getAll().then(data => {
      setNotes(data)
    })
  }, [])

  return (
    <div>
      <h1>Notes</h1>
      {notes.map(note => (<div key={note.id}>{note.content} </div>))}
    </div>
  )
}

export default App