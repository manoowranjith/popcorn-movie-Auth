const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const md5 = require('md5');
const app = express()

const credentials=[
    {
        email:"1@gmail.com",
        password:"12345",
    },
    {
        email:"2@gmail.com",
        password:"12345",
    },
    {
        email:"3@gmail.com",
        password:"12345",
    }
]

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}) );

app.all("*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
app.use(cors(
    {
        origin: "*",
    }
))
app.listen(3000,()=>{
    console.log("Port 3000 is running")
})

app.post('/signup',(req,res)=>{
    var obj = {};
    obj["email"] = req.body.email;
    obj["password"] = req.body.password;
    credentials.map(details =>
        {
            if(details.email === req.body.email)
            {
        
                res.json({key:"no-access-login-required"})
                res.end()
            }
        });
    credentials.push(obj);
    res.json({key:md5(req.body.email+req.body.password)})
    res.end()
})

app.post('/login',(req,res)=>{
    console.log(req.body.email,req.body.password)
    credentials.map(details =>
        {
            if(details.email === req.body.email && details.password === req.body.password)
            {
                
                res.json({key:md5(req.body.email+req.body.password)})
                res.end()
            }
        }
    )
    res.json({key:"no-access"})
    res.end()
})