
const express = require('express')
const app = express()
const cors = require('cors')
 


app.use(express.json())
app.use(cors())
app.use(express.static('dist'))


 let notes = [
    {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/',(req, res)=>{
 res.send('<h1>Welcome to my sever</h1>')
})

app.get('/api/notes', (req,res)=>{
  res.json(notes)
})

app.get('/api/notes/id/:id', (req, res )=>{
  const id = Number(req.params.id)

  const ids = notes.find(n => n.id === id)
  if (!ids) res.json({error: 'not found'})
    res.json(ids)
  
})
app.get('/api/notes/name/:name', (req, res )=>{
  const name = req.params.name.toLowerCase()

  const nms = notes.find(ns => ns.name === name)
    if(!nms) res.json({error: 'name not exist'})
    res.json(nms)
})

app.get('/api/notes/arrived/:value', (req, res) => {
  const value = req.params.value == "true"

  const vals = notes.filter(vl => vl.arrived === value )
  if (!vals) res.json({ error: 'no info' })
  res.json(vals)
})

app.get('/api/notes/gender/:gender', (req, res )=>{
 const genda = req.params.gender
 const alg = notes.filter(a => a.gender === genda)
  if (!alg) res.json({ error: 'no info' })

 res.json(alg)
})

app.delete('/api/notes/id/:id', (req, res)=>{
    const id = Number(req.params.id)

    const note = notes.find(n => n.id === id)

    if (!note) res.json({error: 'delete unsuccessfull '})
      notes = notes.filter(n => n.id !== id)
    return res.json({message: 'delete successfull'})
})

app.put('/api/notes/id/:id', (req, res) => {
  const body = req.body
  const id = Number(req.params.id)

  const note = notes.find(n => n.id === id)

  if (!note) {
    return res.json({ error: 'item not found' })
  }

  const updated = { ...note, ...body }

  notes = notes.map(n => n.id === id ? updated : n)

  res.json(updated)
})

app.post('/api/notes/', (req,res)=>{
  const body = req.body

  const generateId = () =>{
    const maxId = notes.length > 0
    ? Math.max(...notes.map(n => Number(n.id)))
    : 0
    return maxId + 1
  }
  
  const newNote = {
    id: generateId(),  
    name: body.name,
    gender: body.gender,
    arrived: body.arrived || false
  }
  notes = notes.concat(newNote)
  res.json(notes)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

 
































































































































