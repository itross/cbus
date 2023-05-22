'use strict'

const CommandBus = require('..')
const { test } = require('tap')

test('Should create a valid CommandBus instance', t => {
  t.plan(1)
  const bus = new CommandBus()
  t.not(bus, undefined, 'CommandBus not created')
})

test('Should register a command handler', t => {
  t.plan(1)

  const bus = new CommandBus()

  bus.registerHandler('test-command', () => {})
  t.not(bus.hasHandler('test-command'), false, 'command handler not regitered')
})

test('Should register handler, send command and handle it', async t => {
  t.plan(2)

  const bus = new CommandBus()

  bus.registerHandler('sum', async (args) => {
    return Promise.resolve(args.a + args.b)
  })

  const sum = await bus.send('sum', { a: 10, b: 2 })
  t.ok(sum, 'error in command execution result')
  t.equal(sum, 12, 'error in result: expecting 12')
})

test('Should get error registering handler with no handler Function', t => {
  t.plan(1)

  const bus = new CommandBus()

  // t.rejects(bus.registerHandler('only-command-name'),
  //   'Malformed params for registerHandler(). Expecting 2 params: "command" as a string and "handler" as a function.')

  t.throws(() => {
    bus.registerHandler('only-command-name')
  }, Error('Malformed params for registerHandler(). Expecting 2 params: "command" as a string and "handler" as a function.'))
})

test('Should get error registering handler with no params', t => {
  t.plan(1)

  const bus = new CommandBus()

  t.throws(() => {
    bus.registerHandler()
  }, Error('Malformed params for registerHandler(). Expecting 2 params: "command" as a string and "handler" as a function.'))
})

test('Should get error registering handler twice', t => {
  t.plan(1)

  const bus = new CommandBus()

  bus.registerHandler('test', () => {})
  t.throws(() => {
    bus.registerHandler('test', () => {})
  }, Error('Handler already registered for command "test".'))
})

test('Should get error registering handler with non-string command param', async t => {
  t.plan(1)

  const bus = new CommandBus()

  t.throws(() => {
    bus.registerHandler(['command'], () => {})
  }, Error('The "command" param must be a string.'))
})

test('Should get error registering handler with non-function handler param', async t => {
  t.plan(1)

  const bus = new CommandBus()

  t.throws(() => {
    bus.registerHandler('command', {})
  }, Error('The "handler" param must be a function.'))
})

test('Should send command even without args for the handler', async t => {
  t.plan(1)

  const bus = new CommandBus()

  bus.registerHandler('test', async (args) => Promise.resolve('command handled'))

  const result = await bus.send('test')
  t.equal(result, 'command handled', 'command result is not as expected')
})

test('Should reject calling send() with no params', async t => {
  t.plan(1)

  const bus = new CommandBus()

  t.rejects(bus.send())
})

test('Should reject calling send() with non-string command param', async t => {
  t.plan(1)

  const bus = new CommandBus()

  t.rejects(bus.send(['command']))
})

test('Should reject calling send() for a command with no handler registered', async t => {
  t.plan(1)

  const bus = new CommandBus()

  t.rejects(bus.send('command', { foo: 'bar' }))
})

test('Should get false calling hasHandler with null value ad command', async t => {
  t.plan(1)

  const bus = new CommandBus()

  t.equal(bus.hasHandler(null), false, 'hasHandler(null) should return false')
})
