const express = require('express')
const app = express()
const http = require('http').createServer(app)

const gameRooms = {}

// Configuration
app.use('/static', express.static('public'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) =>     res.render('room_list'))
app.get('/game', (req, res) => res.render('game'))
app.get('*', (req, res) =>     res.redirect('/')) // Redirect any invalid path

// Start server
http.listen(80, () => {
  console.log('Server listening on port 80')
})