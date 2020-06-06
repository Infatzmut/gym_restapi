const express = require('express');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const app = express();
const port = process.env.PORT || 5000;

// middlewares  
app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(morgan('dev'));

//Setting the port
app.set('port', port);

// Setting the routes
//app.use('/api/', require('./api/controllers/'));

// create the server
const server = http.createServer(app)
// starting the app
server.listen(app.get('port'), (req,res) => {
    console.log(`Server listenning on port ${app.get('port')}`);
})