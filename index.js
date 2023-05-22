'use strict'

class CommandBus {
  #handlers

  constructor () {
    this.#handlers = {}
  }

  registerHandler (command, handler) {
    if (arguments.length !== 2) {
      throw new Error('Malformed params for registerHandler(). Expecting 2 params: "command" as a string and "handler" as a function.')
    }
    if (typeof command !== 'string') {
      throw new TypeError('The "command" param must be a string.')
    }
    if (typeof handler !== 'function') {
      throw new TypeError('The "handler" param must be a function.')
    }
    if (this.hasHandler(command)) {
      throw new Error(`Handler already registered for command "${command}".`)
    }

    this.#handlers[command] = handler
    return this
  }

  hasHandler (command) {
    return command ? this.#handlers[command] !== undefined : false
  }

  async send (command, data = {}) {
    if (arguments.length === 0) {
      return Promise.reject(
        new Error('Missing params for send(). Expecting at least 1 param: "command" as string. Second param should be command data, if any, for the handler.')
      )
    }
    if (typeof command !== 'string') {
      return Promise.reject(
        new TypeError('The "command" param must be a string')
      )
    }
    if (!this.hasHandler(command)) {
      return Promise.reject(
        new Error(`No handler registered for command "${command}".`)
      )
    }

    return this.#handlers[command](data)
  }
}

module.exports = CommandBus
