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
// app.post('/api/user/signup',require('./routes/user'));
app.post('/api/user/signup',upload.single('imageUrl'),async(req,res)=>{
  //Checking if user already exists
  let findUser=await User.findOne({email:req.body.email});
  if(findUser){
      success=false;
      return res.status(400).json({success:success,message:'User Already Exists'});
  }
  //checking for validation errors like email,password
  const errors = validationResult(req);

  //error handling
  if(!errors.isEmpty()){
      success=false;
      res.status(400).send({success,errors});
  }
  else{
      //securing the password using bycrypt
      let salt=bycrypt.genSaltSync(10);
      let securePassword=bycrypt.hashSync(req.body.password,salt);

      //image handling
      console.log(req.body);
      console.log(req.file);
      const storage = multer.diskStorage({
          destination: function (req, file, cb) {
            return cb(null, './uploads')
          },
          filename: function (req, file, cb) {
            return cb(null, `${Date.now()}-${file.originalname}}`)
          }
        })
        
        const upload = multer({ storage });
  
      //creating new User
      let newUser=await User.create({
          name:req.body.name,
          email:req.body.email,
          password:securePassword,
          imageUrl:""
      })

      //sending a token to get saved in localSystem
      const tokenData={
          user:{
              id:newUser.id
          }
      }
      const authToken=jwt.sign(tokenData,secret);
      success=true;
      res.status(201).json({success:success,authToken:authToken});
  }
});
//login Route -2
app.post('/api/user/login', [
  body('email', "enter a valid email").isEmail(),
  body('password', "Cannot be empty").exists(),
], async (req, res)=>{
  //validation error checking
  const errors = validationResult(req)
  if(!errors.isEmpty()){
      success=false;
      res.status(400).json({success,errors});
  }
  else{
      //find the user
      let findUser = await User.findOne({ email: req.body.email });
      if (!findUser) {
          success=false;
          return res.status(400).json({success:success,message:"User Does Not Exists"});
      }
      //Password Comparison
      const passCompare = bycrypt.compareSync(req.body.password, findUser.password);
      if (passCompare) {
          //user login success
          const data={
              user:{
                  id:findUser.id
              }
          }
          const authToken=jwt.sign(data,secret);
          success=true;
          res.status(200).json({success:success,authToken:authToken});
      }
      else {
          success=false
          res.status(400).json({success:success,message:"User Not Found"})
      }
  }
});
//endpoint to extract data front authToken
app.post('/getuser',fetchuser,async(req,res)=>{
  try{
      const userid=req.body.id;
      const userDetails=await User.findById(userid).select('-password');
      res.json(userDetails);
  }
  catch{
      res.status(400).send('User Not Found');
  }
})

//listeners
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
