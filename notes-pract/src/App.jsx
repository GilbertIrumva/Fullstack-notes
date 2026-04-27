import axios from 'axios'

const baseUrl = 'https://your-app.onrender.com/api/notes'

// GET all
const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

// CREATE
const create = async (newVisitor) => {
  const res = await axios.post(baseUrl, newNote)
  return res.data
}

// UPDATE
const update = async (id, updatedVisitor) => {
  const res = await axios.put(`${baseUrl}/${id}`, updatedNote)
  return res.data
}

// DELETE
const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`)
}

export default {
  getAll,
  create,
  update,
  remove
}