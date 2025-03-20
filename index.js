/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();

const PORT = 5000;

/* discussion/lesson on app.route() / routing in-depth */

/* 
app.route() >> this method provides a chainable interface for defining multiple HTTP methods on the
  same route path. this reduces redundancy and the code is more concise
*/

// without app.route() - repetitive path specification
app.get('/users', (request, response) => {
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
});

// with app.route() - cleaner and more maintainable
app.route('/')
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
  });

// call listen method with logging middleware function to listen to a specific port provided where requests are made
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})

