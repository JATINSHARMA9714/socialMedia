const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors')


//app congfig
const app=express();
const port=process.env.PORT||8000;



//middlewares
app.use(express.json());
app.use(cors());


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
app.use('/api/user' ,require('./routes/user'));


//listeners
app.listen(port, () => {
    console.log(`App listening on port ${port}`)
  })
