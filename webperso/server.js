import express from 'express'
import mysql from 'mysql2/promise'
import cors from 'cors'
import bcrypt from 'bcrypt'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

const db = await mysql.createConnection({
  host: 'localhost',
  user: 'flask',        
  password: 'motdepasse',    
  database: 'webperso'
})

app.post('/api/login', async (req, res) => {
  const { login, password } = req.body

  const [rows] = await db.execute(
    'SELECT * FROM prestataire WHERE login = ?', [login]
  )

  if (rows.length === 0) {
    return res.status(401).json({ message: 'Identifiants incorrects' })
  }

  const user = rows[0]

  if (password !== user.mdp) {
    return res.status(401).json({ message: 'Identifiants incorrects' })
  }

  res.json({ message: 'Connecté', user: { id: user.IDpresta, login: user.login, acces: user.acces } })
})

app.listen(3000, () => console.log('API sur http://localhost:3000'))