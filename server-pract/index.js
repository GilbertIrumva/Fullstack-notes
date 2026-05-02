const express = require('express')
const path = require('path')
const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'dist')))

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id
  const note = notes.find((note) => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.status(404).end()
  }
})

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use((req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})