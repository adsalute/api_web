const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;


//require('dotenv').config({ path: path.join(__dirname, '../config')});
app.use(cors());
app.use(bodyParser.json({limit:'5mb'}));

app.use(bodyParser.urlencoded({extended:false}));


const Users = require("./routes/Users");
const Modules = require("./routes/Modules");


app.use("/users", Users);
app.use("/modules", Modules);

app.listen(port, function(){
    console.log("server is running port: " + port);
});