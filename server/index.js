const express = require('express')
const app = express()
const http = require('http').createServer(app)

const gameRooms = {}

// Configuration
app.use('/static', express.static('public'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) =>     res.render('game_list'))
app.get('/game', (req, res) => {
  if (!req.query.room || !req.query.room.trim()) { // Trying to load game but no game room specified
    res.redirect('/')
    return
  }
  res.render('game')
})
app.get('*', (req, res) =>     res.redirect('/')) // Redirect any invalid path

// Start server
const port = 80
http.listen(port, () => {
  console.log('Server listening on port ' + port)
})