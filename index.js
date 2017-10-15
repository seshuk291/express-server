let express = require('express');
let hbs = require('hbs');
let app = express();
let fs = require('fs');

//Register handle bars partials 
//partials are small templates that can be reusable
hbs.registerPartials(__dirname + '/views/templates');

//define global methods
//registerHelper method helps us define global variables that can be used all over the website
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//Register a middleware to log requests
app.use((req, res, next) => {
    var now = new Date().toString();
    var log = req.method + " " + req.url;
    console.log(now + ':' + log);
    fs.appendFile('log.txt', now + ':' + log + "\n", (err) => {
        if (err) {
            console.log(err);
        }
    });
    next();
});

// Register a maintainence middleware
// app.use((req,res)=>{
//     res.render('maintainence.hbs');
// });

app.get('/', (req, res) => {
    //render takes two arguments one for the file to render and the second is any obejct to the template
    res.render('home.hbs', {
        title: "Homepage"
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: "About page"
    });
});

app.listen(3000, () => {
    console.log("server started on port 3000");
});