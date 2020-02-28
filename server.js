const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;


//require('dotenv').config({ path: path.join(__dirname, '../config')});
app.use(bodyParser.json({limit:'5mb'}));
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
    name:'personID',
    secret: 'my super secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true }
}));

var Users = require("./routes/Users");
var Modules = require("./routes/Modules");


app.use("/users", Users);
app.use("/modules", Modules);

app.listen(port, function(){
    console.log("server is runnint port: " + port);
});