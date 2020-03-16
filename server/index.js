const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const shortid = require('shortid')
const Game = require('./game').Game

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
app.get('/createroom', (req, res) => {
  if (Object.keys(games).length > 50) {
    res.send(403).send({ message: 'There are too many games already! Cannot create any more.' })
    return
  }

  const gameId = createNewGame()
  res.redirect(`/?game=${gameId}`)

  console.log('games:\n', games)
})
app.get('*', (req, res) =>     res.redirect('/')) // Redirect any invalid GET path

// Start server
const port = 80
http.listen(port, () => {
  console.log('Server listening on port ' + port)
})

function createNewGame() {
  const gameId = generateNewGameId()
  const namespace = io.of(gameId)
  const deleteFunction = () => { deleteGame(gameId) }
  games[gameId] = new Game(namespace, deleteFunction)
  return gameId
}

function generateNewGameId() {
  while (true) {
    let gameId = shortid.generate()
    if (!games[gameId]) {
      return gameId
    }
  }
}

function deleteGame(gameId) {
  delete games[gameId]
}