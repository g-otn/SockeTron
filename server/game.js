const shortid = require('shortid')

function GameRoom(socket) {
  this.room = shortid.generate()
}