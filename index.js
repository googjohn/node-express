/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();
const cors = require('cors');

const PORT = 5000;

/* discussion/lesson on app.use() */

/* 
  app.use() >> this method is used to add middleware to our application.
  >> as defined before, middleware is a function that has access to request and response objects in the request
    response cycle, and the next() function that directs to the next middleware/handler function 
  >> allows us to apply middlewares globaly(every request when there is no specific path provided)
  >> for specific routes/paths and/or specific HTTP methods (get, put, patch, post, delete)
  >> again, when there is no provided path/route, it applies to all routes
  >> is the primarily and effectively only method in Express.js where we can omit the first argument path, 
  >> that is why it is called for global middlewares or handlers for all request like a validation handler
*/

// custom middleware that logs a date when the request was made
const stampLogger = (request, response, next) => {
  console.log(JSON.stringify({
    "timestamp": new Date().toISOString(),
    "status": response.ok,
    "method": request.method,
    "url": request.url
  })
  )
  // necessary to call this or the next middleware function will not be called. 
  // acts like an infinite loop error if not used on middlewares that don't send response
  next();
}

// this will show anything to the client because we didn't send any response yet
// this will log the timestamp on every kind of request made on localhost:port
app.use(stampLogger)

// another way to apply middleware function
app.use((request, response, next) => {
  if (request.method === 'GET') {
    console.log('Get request received')
    // response.send(`Request received! method: ${request.method} hostname: ${request.hostname}`)
    next()
  }
  next(); // necessary to call if request method is not 'get' because it will not send the response and we need to direct/pass the control to the next middleware/http method or there will be error
})

app.post('/', (request, response) => {
  console.log('Post request received')
  response.json({ message: `Post request receieved!`, timestamp: new Date().toISOString(), })
})

/* 
  >> other ways to use app.use() where the middleware are built-in middleware like express.static(), express.json() ... 
  >> again, without path the middleware will apply to all routes, otherwise only to specific paths provided when present
*/
// for parsing JSON request bodies. this will be explained more when we get to fetching from a client with json/object request
app.use(express.json())

// for parsing URL-encoded request bodies
app.use(express.urlencoded({ extended: true }))

// for serving static files >> 'public' is where it will get the files requested 
app.use(express.static('public'))

// we can also place a psuedo path where it is shown in the url. for example localhost/static/something.js instead of localhost/public/something.js. they are basically the same.
app.use('/static', express.static('public'))

/* example for multiple middleware functions in one app.use() without path argument */

// app.use((request, response, next) => {
//   // this will stop here and ignore remaing app.use() below.
//   response.send('You request for localhost/. control stops here')
// })

app.use((request, response, next) => {
  request.requestTime = new Date().toISOString();
  next(); // has to call to pass the control to the next middleware otherwise will cause error/block the request-response cycle
}, (request, response, next) => {
  console.log(`Request started at ${request.requestTime}`)
  next();
}, (request, response, next) => {
  // for this to be sent we need to place next to the app.use() above and comment out the response
  // response.send('Finally after multiple middlewares!!! It worked!')
  next()
})

// error handling middleware has special signature with four arguments
// will not be called if there is no error object passed in next() function call
app.use((err, req, res, next) => {
  console.error(err.stack);
  console.log('hello')
  res.status(500).send('Something broke!');
});

/* using app.use(path, middleware) with path argument */
// because we use a path, this will only be called if our request comes from the same route/path
app.use('/api', (request, response, next) => {
  console.log(`Request from path /api received.`)
  next();
})

app.use('/api', (request, response) => {
  // for this to work we need to disable/comment out the response again in the previous app.use() call especially that it was an app.use() call without path -- it affects all routes/https methods
  response.send('You are accessing localhost/api')
})

/* some more thirdyparty middleware passed in app.use() */
app.use(cors());

// request body compression
/* const compression = require('compression')
app.use(compression()) */

// HTTP request logger
/* const morgan = require('morgan)
app.use(morgan('dev')) */

// cookie parser
/* const cookieParser = require('cookie-parser') 
app.use(cookieParser()) */

// session middleware
/* const session = require('session');
app.use(session({
  secret: 'something secret',
  resave: false,
  saveUninitialized: true,
})) */

// security middleware
/* const helmet = require('helmet')
app.use(helmet()) */

// custom application middleware like authentication and validation 
// authentication middleware
/* app.use((request, response, next) => {
  const token = request.headers.authorization;
  if (token) {
    request.user = verifyToken(token);
  }
  next();
}) */

// request validation
/* app.use((request, response, next) => {
  if (request.method === 'POST' && !req.is('application/json')) {
    return response.status(400).send('Content-type must be application/json')
  }
  next();
}) */

// rate limiting
/* app.use((request, response, next) => {
  const requestPerminute = getRequestCount(request.ip)
  if (requestPerminute > 100) {
    return response.status(429).send('Too Many Requests')
  }
  next();
})
 */

// call listen method with logging middleware function to listen to a specific port provided where requests are made
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})

