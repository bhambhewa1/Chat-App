const mongoose = require("mongoose");
const DB = process.env.ATLAS_URI;

mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection Successfull...");
  })
  .catch((err) => {
    console.log(err, "No Connection");
  });

// server.js file is run once a time, after that request or routes will work. Because
// without use nodemon or start server, a request never complete, so console of
// 'listen on port' and 'connection successful' show once a time after that routes will work.
// So, their is no meant 'listen on port' is first or 'connection successful' is first shown.
