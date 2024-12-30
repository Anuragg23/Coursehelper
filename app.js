const express = require('express');
const app = express();
const courseModel = require('./models/coursemodel');
const path = require('path');

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended :true}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', (req,res) =>{
    res.render("index");
})

app.get('/Home', async (req,res) =>{
    let courses = await courseModel.find()
   res.render("Home", {courses});
})

app.post('/create', async (req,res) =>{
    let {name , image, code, credit,Description}  = req.body;
    let  createdCourse =  await courseModel.create({
         name,
         image,
         code,
         credit,
         Description
    })
    res.redirect("/Home");
 })

 app.get('/delete/:id', async (req,res) =>{
    let course = await courseModel.findOneAndDelete({_id: req.params.id})
   res.redirect("/Home");
})

app.get('/edit/:id', async (req,res) =>{
    let course = await courseModel.findOne({_id: req.params.id})
   res.render("edit", {course});
})
 

app.post('/update/:id', async (req,res) =>{
    let {name , image, code, credit,Description}  = req.body;

    let course = await courseModel.findOneAndUpdate({_id: req.params.id},{name , image, code, credit,Description},{new:true});
   res.redirect("/Home");
})
 
app.listen(3000);