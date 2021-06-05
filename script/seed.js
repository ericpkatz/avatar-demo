'use strict'

const {db, models: {User} } = require('../server/db')

const avatar = 'data:image/png;base64,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';

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }) // clears db and matches models to tables
  console.log('db synced!')

  // Creating Users
  const users = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '123', avatar }),
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
  return {
    users: {
      cody: users[0],
      murphy: users[1]
    }
  }
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
