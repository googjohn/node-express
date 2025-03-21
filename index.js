/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();
// call express Router to create an instance
const router = express.Router()

const PORT = 5000;

/* discussion/lesson on app.route() / routing in-depth */

/* 
app.route() >> this method provides a chainable interface for defining multiple HTTP methods on the
  same route path. this reduces redundancy and the code is more concise
*/

// without app.route() - repetitive path specification
/* app.get('/users', (request, response) => {
  response.send('Get all users');
});

app.post('/users', (request, response) => {
  response.send('Create new user');
});

app.put('/users', (request, response) => {
  response.send('Update all users');
});

app.delete('/users', (request, response) => {
  response.send('Delete all users');
}); */

// with app.route() - cleaner and more maintainable
/* app.route('/users')
  .get((request, response) => {
    response.send('Get all users');
  })
  .post((request, response) => {
    response.send('Create new user');
  })
  .put((request, response) => {
    response.send('Update all users');
  })
  .delete((request, response) => {
    response.send('Delete all users')
  }); */

/* now using the router instance of express */
/* 
  router.use() >> is scoped to the router instance it's used in
    >> it registers middleware only for routes defined in that router
*/

/* router.use((request, response, next) => {
  console.log('Router middleware')
  // response.send('Welcome')
  next()
})
router.get('/user', (request, response) => {
  response.send('Get request received')
}) */

// mount the router to use
/* app.use('/api', router)

// we can also chain these methods by using route() on router
router.route('/profile')
  .get((request, response) => {
    response.send('Get request received')
  })
  .post((request, response) => {
    response.send('Post request received')
  })
  .put((request, response) => {
    response.send('Update request received')
  })
  .delete((request, response) => {
    response.send('Delete request received')
  })

app.use('/api/v2', router)

 */

// let's create a routes folder and mount those routes here using express.Router()
const userRouter = require('./routes/usersRoutes');
const exercisesRouter = require('./routes/exercisesRoutes')
app.use('/api/users', userRouter)
app.use('/api/exercises', exercisesRouter)

// call listen method with logging middleware function to listen to a specific port provided where requests are made
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})

