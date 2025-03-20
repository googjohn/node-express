/* declare/define express by calling using require() or import on common js and type module, respectively */
const express = require('express');
// call express to create instance
const app = express();

const PORT = 5000;

/* discussion/lesson on app.use() */

// call listen method with logging middleware function to listen to a specific port provided where requests are made
app.listen(PORT, () => {
  console.log(`Server is listening to http://localhost:${PORT}`)
})
