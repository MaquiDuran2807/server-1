const express =require('express');
const path = require('path');
const morgan =require('morgan');
const cors=require('cors');
require('dotenv').config();
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
app.use(cors)
app.disable('x-powered-by');

server.listen(process.env.PORT,(err)=>{
    if (err)throw new Error(err);
    console.log('servidor correiendo en puerto',process.env.PORT);
});

