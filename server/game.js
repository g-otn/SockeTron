class User {

  constructor(/** @type {SocketIO.Socket} */ socket, /** @type {string} */ name) {
    this.socket = socket
    this.name = name
  }

}
class Player extends User {

  constructor(/** @type {SocketIO.Socket} */ socket, /** @type {string} */ name, /** @type {'blue'|'orange'|'green'|'purple'} */ color) {
    super(socket, name)
    this.color = color
    this.ping = { value: -1, /** @type {Date} */ checkStartDate }
    /** @type {'unready'|'ready'|'alive'|'dead'} */
    this.status = 'unready'
    this.lightCycle = {
      /** @type {'up'|'down'|'left'|'right'} */ direction: null,
      position: { x: -1, y: -1 }
    }
    this.direction = null
    this.boost = {
      active: false,
      remaining: 3,
    }
  }

  resetLightCycle() {
    switch (this.color) {
      case 'blue':
        this.lightCycle.direction = 'right'
        this.lightCycle.position = { x: 31, y: 31 }
        break
      case 'orange':
        this.lightCycle.direction = 'left'
        this.lightCycle.position = { x: 62, y: 31 }
        break
      case 'green':
        this.lightCycle.direction = 'right'
        this.lightCycle.position = { x: 31, y: 62 }
        break
      case 'purple':
        this.lightCycle.direction = 'left'
        this.lightCycle.position = { x: 62, y: 62 }
        break
    }
  }

}

// class Move {
//   constructor()
// }

module.exports.Game = class {

  constructor(/** @type {SocketIO.Namespace} */ namespace, /** @type {function} */ deleteFunction) {
    this.namespace = namespace
    this.status = 'waiting'
    this.players = {}
    this.spectators = {}
    this.moves = []
    /** @type {'waiting'|'in-progress'} */
    this.gameLoopInterval = null
    this.namespace.on('connection', socket => {

      socket.on('pong', ms => {
        console.log(ms)
      })

      socket.on('disconnect', () => { })
    })
    this.over = deleteFunction
  }

  startGame() {
    // for ();
  }

}
