const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')
const multer=require('multer')
const User = require('./Models/User');
const bycrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const jwt=require('jsonwebtoken');
const fetchuser = require('./middlewares/fetchuser');
const secret="groupProject";


//app congfig
const app=express();
const port=process.env.PORT||8000;
const upload = multer({ dest: 'uploads/' })


//middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:false}));


//db config
const connectionUrl='mongodb+srv://groupProject:groupProject10@socailmedia.ftxgeur.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(connectionUrl,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.once('open', function(err, resp){
    console.log("DB Connected");
  });


//api endpoints
//1- LOGIN  SIGNUP
app.use('/api/user',require('./routes/user'));


//listeners
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
