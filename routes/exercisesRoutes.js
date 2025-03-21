// declare express instance
const express = require('express');
const router = express.Router();

const timeLog = (request, response, next) => {
  console.log(`This is a middleware for /api/exercises router`)
  console.log(`Time: ${new Date().toISOString()}`)
  next();
}
// logs time for this specific router
router.use(timeLog)

// utilize router.route() for chainable http methods
router.route('/')
  .get((request, response) => {
    const responseObject = {
      username: request.body?.user ?? 'Anonymous',
      isAdmin: false,
      message: 'Get exercises request received',
      timeRequested: new Date().toISOString(),
    }
    console.log(`${request.method} exercises request to ${request.url} received!`)
    response.status(200).json(responseObject)
  })
  .post((request, response) => {
    const responseObject = {
      message: 'Create new exercises request received',
      timeRequested: new Date().toISOString(),
    }
    console.log(`${request.method} exercises request to ${request.url} received!`)
    response.status(200).json(responseObject)
  })
  .put((request, response) => {
    const responseObject = {
      message: 'Update exercises request received',
      timeRequested: new Date().toISOString(),
    }
    console.log(`${request.method} exercises request to ${request.url} received!`)
    response.status(200).json(responseObject)
  })
  .delete((request, response) => {
    const responseObject = {
      message: 'Delete exercises request received',
      timeRequested: new Date().toISOString(),
    }
    console.log(`${request.method} exercises request to ${request.url} received!`)
    response.status(200).json(responseObject)
  })

module.exports = router