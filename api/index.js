const express = require('express')
const cors = require('cors')
const prisma = require('./prismaClient')

const app = express()
const port = 3333

app.use(cors())
app.use(express.json())

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: 'Invalid JSON format.' })
  }
  next()
})

app.get('/', (req, res) => {
  res.json({ message: 'API do curso Ninja do Cypress!' })
})

app.post('/api/users/register', async (req, res) => {
  const { name, email, password } = req.body

  if (
    !verifyFields(name, 'name', res) ||
    !verifyFields(email, 'email', res) ||
    !verifyFields(password, 'password', res)
  )
    return

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered!' })
    }

    const newUser = await prisma.user.create({
      data: { name, email, password }
    })

    return res.status(201).json({
      message: 'User successfully registered.',
      user: newUser
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      error: 'An unexpected error occured while processing your request.'
    })
  }
})

app.get('/api/users', async (req, res) => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false
    }
  })
  res.status(200).json(users)
})

app.put('/api/users/:id', async (req, res) => {
  const { id } = req.params
  const { name, email, password } = req.body

  verifyFields(name, 'name', res)
  verifyFields(email, 'email', res)
  verifyFields(password, 'password', res)

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!user) return res.status(404).json({ error: 'User not found.' })
      
    await prisma.user.update({
      where: { id: Number(id) },
      data: {
        name,
        email,
        password
      }
    })

    res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Error updating user :(' })
  }
})

app.delete('/api/users/:id', async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(id) }
    })

    if (!user) return res.status(404).json({ error: 'User not found.' })

    await prisma.user.delete({ where: { id: Number(id) } })
    return res.status(204).end()
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user :(' })
  }
})

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`)
})

function verifyFields(field, fieldName, res) {
  if (!field) {
    res.status(400).json({ error: `${fieldName} is required!` })
    return false
  }
  return true
}
