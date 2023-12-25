const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./app/config/db");
const routes = require("./app/routes/index");
// const bodyParser = require('body-parser')
// const fileUpload = require('express-fileupload')

const app = express();
const port = process.env.PORT || 8000;

// cors used to communicate with frontend having different cross origin for resource sharing
app.use(cors()); // froentend and backend run on different localhost, so making their origin same
app.use(express.json());
// app.use(bodyParser.json()) //req.body data is undefined, so getting json data in json format on backend
// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: "/uploads"
// }))

// Load routing
app.use("/api", routes);

app.listen(port, () => {
  console.log(`Server listen at ${port} port`);
});



// ctrl + d => used for selecting all word of same name 