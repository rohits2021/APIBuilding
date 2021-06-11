const express = require('express');
// const http = require('http');
// const fs = require('fs');
const logger = require('morgan');
const app = express();
const users = require('./routes/users');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIAuthentication',
                   {     useNewUrlParser: true,
                         useUnifiedTopology: true,
                         useFindAndModify:false
                    }
                ).then(()=>{
                    console.log('Database is Connected')
                });
//Middleware

// fs.readFile('textFile.txt', 'utf-8',function (err, data) {
//     if (err) throw err;
//     console.log(data);
// });

// fs.writeFile('textFile.txt','A new line is added',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })

app.use(logger('dev'));
app.use(express.json());
// app.use(express.static('public'));  server static image or any other file using express
//app.use('/images', express.static(__dirname + '/geniusIssue.png'));  

//Routes

app.use('/users',users)

// app.get('/', function (req, res) {
//     res.send(`<!DOCTYPE html>
//                 <html xmlns="http://www.w3.org/1999/xhtml">
//                 <head>
//                     <meta charset="utf-8" />
//                     <title></title>
//                 </head>
//                 <body>
//                     <form action="/submit-student-data" method="post">
//                         First Name: <input name="firstName" type="text" /> <br />
//                         Last Name: <input name="lastName" type="text" /> <br />
//                         <input type="submit" />
//                     </form>
//                 </body>
//                 </html>
//             `)
// });

// app.post('/submit-student-data', function(req,res){
//     var name = req.body.firstName + ' ' + req.body.lastName
//     console.log(name);
// })


//Catch 404 error routes and forward them Error Handlers  Functions
app.use((req,res,next)=>{
    const err = new Error('Not Found');
    err.status = 400;
    next(err);
})

//Errro handlers functions
app.use((err,req,res,next)=>{
    //Resp to Client
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status ||  500;
    res.status(status).json({
        message: error.message
    })

    //Resp to Server
    console.error(err);
})

//Start the Server




const port = app.get('port') || 3000
app.listen(port,()=>{
    console.log(`Server is listening to port number ${port}`);
})