const express =require('express');
const path = require('path');
const morgan =require('morgan');
const cors=require('cors');
const redis = require('redis');
const clients = redis.createClient({host:'localhost',port:6379});
require('dotenv').config();
clients.connect();
module.exports.clients=clients;



//app de express
const app = express();

//node server
const server =require('http').createServer(app);
 module.exports.io=require('socket.io')(server);
 require('./sockets/socket');

//importar y usar las rutas
const driversRoutes=require('./routes/driversRouts');
driversRoutes(app);
//path publico

const publicPath=path.resolve(__dirname,'public');
app.use(express.static(publicPath));

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));
// funcion guardar en redis el id del usuario y el id del socket en redis
async function saveid  (id,socketsid)  {
    clients.set(id,socketsid);
    let data=await clients.get(id);
    console.log('id guardado en redis '+data);
}

//rutas

app.post('/saveid',(req,res)=>{
    let data;
    let id = req.body.id;
    let socketsid = req.body.socketid;
    saveid(id,socketsid);
    data = { id: id, socketid: socketsid };
    res.json({'ok':data});
});
app.use(cors)
app.disable('x-powered-by');



server.listen(process.env.PORT,(err)=>{
    if (err)throw new Error(err);
    console.log('servidor correiendo en puerto',process.env.PORT);
});

