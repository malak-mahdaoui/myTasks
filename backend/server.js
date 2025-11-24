const express = require('express')
const dotenv = require('dotenv').config({ path: './backend/.env' })
const cors = require('cors');
const port = process.env.PORT || 5001
const mongoDB = require('./config/db')
const errorHandler = require('./middleWare/errorHandler')


mongoDB()
const app = express()

app.use(cors({
  origin: ["http://localhost:3000", "https://task-manager-client-blush.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // pour les cookies
}));

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/tasks', require('./routes/taskRoute'))
app.use('/api/users', require('./routes/userRoute'))
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})