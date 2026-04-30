import axios from "axios"

const baseUrl = "http://localhost:3001/api/notes"

const getAll = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const create = async (newNote) => {
  const res = await axios.post(baseUrl, newNote)
  return res.data
}

const update = async (id, updatedNote) => {
  const res = await axios.put(`${baseUrl}/id/${id}`, updatedNote)
  return res.data
}

const remove = async (id) => {
  await axios.delete(`${baseUrl}/id/${id}`)
}

export default { getAll, create, update, remove }