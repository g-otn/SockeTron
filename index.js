const express = require('express')
const app = express()
const http = require('http').createServer(app)

// Configuration
app.use('/static', express.static('public'))
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) => {
  res.render('room_list')
})
app.get('*', (req, res) => { // Redirect any invalid path
  res.redirect('/') 
})

// Start server
http.listen(80, () => {
  console.log('Server listening on port 80')
})