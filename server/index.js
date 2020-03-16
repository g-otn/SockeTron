const express = require('express')
const app = express()
const http = require('http').createServer(app)

const games = {}

// Configuration
app.use('/static', express.static('public'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
  const gameId = req.query.game

  if (!gameId || !gameId.trim() || !games[gameId]) {
    res.render('game_list')
    return
  }

  res.render('game', games[gameId])
})
app.get('*', (req, res) =>     res.redirect('/')) // Redirect any invalid GET path

// Start server
const port = 80
http.listen(port, () => {
  console.log('Server listening on port ' + port)
})