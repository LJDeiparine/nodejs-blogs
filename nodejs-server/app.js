const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');


//express app 
const app = express();

//connect to MongoDB
const dbURI = "mongodb+srv://ljane123:lhorena123@cluster0.2oqty.mongodb.net/nodejs-blogs?retryWrites=true&w=majority";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3001))
    .catch((err) => 
        console.log('error cant connect')   
    );

//register view engines
app.set('view engine', 'ejs');

//middleware
app.use(express.static('public'));

app.use(express.static('public' + '/img'));


app.use(express.urlencoded({extended :true}));
app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about' , {title: 'About'});  
});



//blog routes
app.use('/blogs' , blogRoutes);

//404
app.use((req, res) => {
    res.status(404).render('404', {title: '404'});
});