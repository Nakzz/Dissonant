const express = require('express')
const app = express()

//use pug engine
app.set('view engine', 'pug');

// serve static flies from the 'public' folder
app.use(express.static(__dirname + '/public'));

// /test routes to another response
app.get('/test', (req,res)=> {
res.send('Hello World!');
});

// index routes to index page with variables being passed in 
app.get('/', (req,res)=> {
res.render('index',{

});
});

// app.get('/profile', (req, res)=> {
// const person = people.profiles.find(p => p.id === req.query.id);
// res.render('profile', {
// title: `About ${person.firstname} ${person.lastname}`, 
// person
// });
// });

const server = app.listen(7002, ()=> {
console.log(`Express running at port ${server.address().port}`);
});
