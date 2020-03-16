module.exports.Game = class {

  constructor(namespace, deleteFunction) {
    /** @type {SocketIO.Namespace} */
    this.nsp = namespace
    /** @type {function} */
    this.close = deleteFunction
  }

}
