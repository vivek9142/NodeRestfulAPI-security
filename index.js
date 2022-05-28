import express, { json } from 'express';
import mongoose from 'mongoose';
import routes from './src/routes/crmRoutes';
import jsonwebtoken from 'jsonwebtoken';
require('dotenv').config({path: './src/.env'});
//dot env config
const app = express();
const PORT = 3000;




// bodyparser setup with express
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// mongoose connection
mongoose.Promise = global.Promise;
    
const DB = process.env.DB.replace("<password>",`${process.env.PASSWORD}`)
    
mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//JWT Setup
app.use((req,res,next)=>{
    if(req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT'){
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1],'RESTFULAPIs',(err,decode)=>{
            if(err)
                req.user = undefined;
                req.user = decode;
                next(); 
        })
    } else{
        req.user = undefined;
        next();
    }
})

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
