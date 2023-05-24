# @itross/cbus

This module implements a simple command bus to help app components interact via
commands.

## Install

```bash
npm i @itross/cbus
```

## Usage

```js
'use strict'

const CommandBus = require('.')

const cbus = new CommandBus()

// register your handler
cbus.registerHandler('create_user', async (data) => {
  // your handling code

  // call a service or whatever
  const user = await saveUser(data)

  return user
})

async function yourMagicBusiness () {
  // ...

  // send your command
  const user = await cbus.send('create_user', {
    username: 'frank.zappa',
    email: 'fz@test.com'
  })
  console.log(`created user: ${JSON.stringify(user, null, 2)}`)

  // ...
}

yourMagicBusiness()

// somewhere in your business galaxy
async function saveUser (data) {
  // your (async) business

  // for sake of test
  return Promise.resolve({
    id: 1,
    ...data
  })
}
```

## API

### registerHandler(command, handler)
Register an handler for a specific command.
* ```command```: a string representing the command name
* ```handler```: a function accepting an object as the command payload

### hasHandler(command)
Checks if an handler for the input command has been registered.<br>
Returns a boolean value.
* ```command```: a string representing the command name to check handler for

### send(command, data)
Send the command with data payload to the handler.<br>
Returns the command result, if any.<br>
Rejects if no handler has been registered for the command.
* ```command```: a string representing the command name to be sent
* ```data```: an object to be sent as command payload

## License

[MIT](LICENSE)
