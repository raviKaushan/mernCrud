const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

//import routes  
const postRouts = require('./routes/posts');

//app middleware
app.use(bodyParser.json());
app.use(cors());
app.use(postRouts); 

const port = 8000; //create port

// db url
const DB_URL = "mongodb+srv://ravi:wCWVcPswEYO7M5Q9@cluster0.1ggos.mongodb.net/mern_crud?retryWrites=true&w=majority";

//connect db
mongoose.connect(DB_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("DB Connected");
}).catch((err) => {
    console.log(err);
})

app.listen(port, () => {
    console.log(`Server Is Running on Port: ${port}`);
});