/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();

const PORT = 5000;

/* this repo/project will probably focus on routes and middleware */
/* routing >> refers to determining how the application reacts/responds from a request to a specific endpoint/path/URI, specific HTTP request method (get, post, put, delete, patch)
  >> each route can have one or more handler functions commonly called middleware function. these functions are executed when the path matches with the request path/route
*/

/* route definition takes this structure: 

  ## app.method(path, handler/middleware)

  app >> an instance of express
  method >> http method (get, post, put, delete, patch)
  path >> is a path on the server where the request is directed to
  handler/middleware >> is the function executed when the router matched with the request

*/

// different HTTP methods with the same path '/'
let getRequestCount = 0;
app.get('/', (request, response, next) => {
  getRequestCount++;
  console.log('This is a get response from a get request.');
  response.json({ message: 'Get request received!', requestCount: getRequestCount })
  // console.log('this will not work because we already completed the request-response cycle by sending a response')
  // next(); // without this next() function call the get response contained in the middleware function of the last get request will not be sent and just cause error. if we sent a response before this next function, then this will be ignored and just proceed to other methods and middleware below
})

let putRequestCount = 0;
app.put('/', (request, response) => {
  putRequestCount++;
  console.log('This is an http put method request.')
  response.json({ message: 'Update request received!', requestCount: putRequestCount })
})

let postRequestCount = 0;
app.post('/', (request, response) => {
  postRequestCount++;
  console.log('This is an http post method request.')
  response.json({ message: 'Post request received!', requestCount: postRequestCount })
})

/* app.use('/', (request, response, next) => {
  console.log('This is a use method and nothing else')
  next(); // without using this next() function to continue process other middleware then the methods below this will not be called
})
 */
let deleteRequestCount = 0;
app.delete('/', (request, response) => {
  deleteRequestCount++;
  console.log('This is an http delete method request.');
  response.json({ message: 'Delete request received!', requestCount: deleteRequestCount })
})

// this will not be called because request-response cycle is completed due to sent response from the first get request
app.get('/', (request, response) => {
  console.log('This will be called but no response will be sent because get http method has already sent a response.')
  // console.log('This response will be shown because we did not send a response from the first get request and next function was called')
  response.send(`Hello, your get request was received! No of requests: ${getRequestCount}`)
})

// call listen method with logging middleware function to listen to a specific port provided where requests are made
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})
