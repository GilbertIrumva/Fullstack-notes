const express = require('express')
const app = express()

app.use(express.json())

let notes = [
  { id: 1, name: "king", arrived: false, gender: "male" },
  { id: 2, name: "queen", arrived: false, gender: "female" },
  { id: 3, name: "prince", arrived: false, gender: "male" },
  { id: 4, name: "princess", arrived: false, gender: "female" },
  { id: 5, name: "guard", arrived: true, gender: "female" },
  { id: 6, name: "ian", arrived: true, gender: "female" },
  { id: 7, name: "alan", arrived: true, gender: "male" },
  { id: 8, name: "general", arrived: true, gender: "male" }
]

// GET all
app.get('/api/notes', (req, res) => {
  res.json(notes)
})

// GET by id
app.get('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const visitor = notes.find(v => v.id === id)

  if (!visitor) return res.status(404).json({ error: 'not found' })
  res.json(visitor)
})

// FILTER by gender
app.get('/api/notes/gender/:gender', (req, res) => {
  const gender = req.params.gender.toLowerCase()
  const result = notes.filter(v => v.gender.toLowerCase() === gender)

  if (result.length === 0) return res.status(404).json({ error: 'not found' })
  res.json(result)
})

// FILTER by arrived
app.get('/api/notes/arrived/:value', (req, res) => {
  const value = req.params.value === "true"
  const result = notes.filter(v => v.arrived === value)

  if (result.length === 0) return res.status(404).json({ error: 'none found' })
  res.json(result)
})

// CREATE
app.post('/api/notes', (req, res) => {
  const body = req.body

  const newVisitor = {
    id: notes.length + 1,
    name: body.name,
    arrived: body.arrived || false,
    gender: body.gender
  }

  notes = notes.concat(newVisitor)
  res.status(201).json(newVisitor)
})

// UPDATE
app.put('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  const body = req.body

  notes = notes.map(v =>
    v.id === id ? { ...v, ...body } : v
  )

  const updated = notes.find(v => v.id === id)
  res.json(updated)
})

// DELETE
app.delete('/api/notes/:id', (req, res) => {
  const id = Number(req.params.id)
  notes = notes.filter(v => v.id !== id)

  res.status(204).end()
})

const PORT = process.env.PORT || 8888
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})