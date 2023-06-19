const jwt=require('jsonwebtoken');
const secret='groupProject';

const fetchuser=(req,res,next)=>{
    const token = req.headers['auth-token'];
    if(!token){
        return res.status(400).json({msg:'No Token Exists'})
    }
    else{
        try{
        const data=jwt.verify(token,secret);
        req.user=data.user;
        next();
        }
        catch{
            return res.status(401).json({msg:'Token Not Valid'});
        }
    }
}
module.exports=fetchuser;