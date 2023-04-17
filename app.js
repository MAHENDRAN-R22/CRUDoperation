"use strict";
const express = require('express');
const app = express();
const mongoose = require("mongoose");
const bodyParser = require('body-parser');
const route = require("./route/rstudent")
app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

//to connect mongodb server
mongoose.connect('mongodb://localhost:27017/studentrecord', {
     useNewUrlParser: true,
     useUnifiedTopology: true
}).then(() => {
     console.log("db was sucessfully connected")
}).catch((err) => {
     res.status(500).send("error occured")
})

//to send ui page doc to browser side
app.get('/', (req, res) => {
     res.sendFile(__dirname + '/public/stuhomepage.html');
});

//get response and save data to db
app.post('/stuformrecord', route.savestuRecord)

//to send database record to ui side
app.post('/sturecordview', route.viewstuRecord)

//to update database 
app.post('/sturecordupdate', route.updatestuRecord)

//to delete database record in ui side
app.post('/sturecorddelete', route.deletestuRecord)

app.listen(9048, () => {
     console.log("server is listening 9048 port");
});
