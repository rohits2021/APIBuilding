const express   = require('express');
const app       = express();
const morgan    = require('morgan');
const users     = require('./routes/users');
const todos     = require('./routes/todos');
const cors      = require('cors');
require('dotenv').config();
const dbConfig   = require('./configuration/db');
          
//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use(morgan('dev'));

app.use('/users',users)
app.use('/todos',todos)

app.use((err,req,res,next)=>{
    //Resp to Client
    const error = app.get('env') === 'development' ? err : {};
    if(error){
        const status = err.status ||  500;
        res.status(status).json({
            message: error.message
        })
        //Resp to Server
        console.error(err);
        next(err);
    }
})

//Start the Server
dbConfig.connection;
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening to port number ${process.env.PORT}`);
})
module.exports = app;



// function middleware(req,res,next){
//     console.log("I am a middleware");
//     next() 
// }
// app.use(middleware);

//Routes
// app.get('/login', function (req, res) {
//     res.render('login')
// });

// app.get('/signup', function (req, res) {
//     res.render('signup')
// });


//set view Engine
// app.engine('html', cons.swig)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');



// app.post('/submit-student-data', function(req,res){
//     var name = req.body.firstName + ' ' + req.body.lastName
//     console.log(name);
// })
//Catch 404 error routes and forward them Error Handlers  Functions
// app.use((req,res,next)=>{
//     const err = new Error('Not Found');
//     err.status = 400;
//     next(err);
// })
//Error handlers functions


// app.use(express.static('public'));  server static image or any other file using express
// app.use('/images', express.static(__dirname + '/geniusIssue.png'));

// fs.readFile('textFile.txt', 'utf-8',function (err, data) {
//     if (err) throw err;
//     console.log(data);
// });

// fs.writeFile('textFile.txt','A new line is added',(err,data)=>{
//     if(err) throw err;
//     console.log(data);
// })
