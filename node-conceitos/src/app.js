const express = require('express')

const { v4: uuid, validate: isUuid } = require('uuid')

const app = express()

app.use(express.json())

function validateRepositoryId(req, res, next) {
  const { id } = req.params
  if (!isUuid(id)) return res.status(400).json({ error: 'Invalid id' })

  return next()
}

app.use('repositories/:id', validateRepositoryId)

const repositories = []

app.post('/repositories', (req, res) => {
  const { title, url, techs } = req.body
  const repository = { id: uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  return res.json(repository)

})

app.get('/repositories', (req, res) => {
  return res.json(repositories)
})

app.put('/repositories/:id', (req, res) => {
  const { id } = req.params
  const { title, url, techs } = req.body

  const repositoryIndex = repositories.findIndex((element) => element.id === id)

  if (repositoryIndex < 0) return response.status(400).json({ error: 'Repository ID not found' })

  repository = { id, title, url, techs, likes: repositories[repositoryIndex].likes }

  repositories[repositoryIndex] = repository

  return res.json(repositories[repositoryIndex])
})

app.delete('/repositories/:id', (req, res) => {
  const { id } = req.params
  const repositoryIndex = repositories.findIndex((element) => element.id === id)

  if (repositoryIndex < 0) return response.status(400).json({ error: 'Repository ID not found' })

  repositories.splice(repositoryIndex, 1)

  return res.status(204).send()

})

app.post('/repositories/:id/likes', (req, res) => {
  const { id } = req.params
  const repositoryIndex = repositories.findIndex((element) => element.id === id)

  if (repositoryIndex < 0) return response.status(400).json({ error: 'Repository ID not found' })
  
  repositories[repositoryIndex].likes++
  
  return res.json(repositories[repositoryIndex])

})

module.exports = app