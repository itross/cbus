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
