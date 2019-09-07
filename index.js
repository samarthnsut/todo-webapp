const express = require('express');
const port = 8000;
const app = express();
const db = require('./config/mongoose');
const element = require('./models/element');

app.set('view engine', 'ejs');
app.set('views', './views')
app.use(express.urlencoded());
app.use(express.static('assets'));

//Handling all get request of the port
app.get('/', function(req, res) {
    element.find({}, function(err, allElements) {
        if (err) {
            console.log("Error in fetching data from Database");
            return;
        } else {
            return res.render('home', {
                title: 'ToDo List',
                all_elements: allElements
            });
        }
    });
});

//Adding element to the Database
app.post('/create-task', function(req, res){
    console.log('Entered values', req.body);
    element.create(req.body, function(err, newElement){
        if(err)
        {
            console.log('Error in creating new task', err);
            return;
        }
        else
        {
            console.log('*******', newElement);
            return res.redirect('back');
        }
    })
})
//deleting individual tasks
app.get("/del/:id",function(req,res){

    let s= req.params.id;
    console.log(s)
    element.findByIdAndDelete(s,function(err){
        if(err)
        {
            console.log("error in deleting")
            return;
        }

     return res.redirect("back")
    })
})
//deleting all tasks in one go
app.get("/delete",function(req,res){

    element.deleteMany(function(err){
        if(err)
        {
            console.log("error in deleting")
            return;
        }

     return res.redirect("back")
    })
})

//Starting server at port 8000
app.listen(port, function(err) {
    if (err)
        console.log(`Error in starting server at port: ${port}`);
    else
        console.log(`Server started at: ${port}`);
});