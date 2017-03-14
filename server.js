var express = require('express');
var morgan = require('morgan');
var path = require('path');

var Pool = require('pg').Pool;

var config = {
    user: 'dhanraj99',
    database : 'dhanraj99',
    host : 'db.imad.hasura-app.io',
    port : '5432',
    passsword : process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});

var articles={
    'article-one' : {
    title:'Article One | dp',
    heading:'Article One',
    date:'Oct 2017',
    content:`
                <p>
                    This is my first article using imad.Internet Explorer assigns all websites to one of four security zones: Internet, Local intranet, Trusted sites, or Restricted sites. The zone to which a website is assigned specifies the security settings that are used for that site. You can choose which websites to assign to the Intranet, Trusted, or Restricted zones. By adding a website to a specific zone, you can control the level of security used on that site. For example, if you have a list of websites that you visit and you completely trust those sites, add those sites to the Trusted zone.
                </p>
                <p>
                    This is my first article usin imad.Internet Explorer assigns all websites to one of four security zones: Internet, Local intranet, Trusted sites, or Restricted sites. The zone to which a website is assigned specifies the security settings that are used for that site. You can choose which websites to assign to the Intranet, Trusted, or Restricted zones. By adding a website to a specific zone, you can control the level of security used on that site. For example, if you have a list of websites that you visit and you completely trust those sites, add those sites to the Trusted zone.
                </p>
                <p>`
    
    },
    'article-two' : {
        title:'Article Two | dp',
        heading:'Article One',
        date:'Oct 2017',
        content:`
            <p>
                This is my second article usin imad.Inted zone.
            </p>`
    },       
    'article-three' : {
        title:'Article Three | dp',
        heading:'Article Three',
        date:'Oct 2017',
        content:`
            <p>
                This is content from my Third article usin imad.
            </p>`
    }
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);
app.get('/test-db',function(req,res){
   pool.query('SELECT * FROM test',function(err,result){
       if(err)
            res.status(500).send(err.toString());
        else
            res.send(JSON.stringify(result));
            
   });
});

var counter =0;
app.get('/counter', function(req,res) {
   counter = counter + 1;
   res.send(counter.toString());
});

var names = [];
app.get('/submit-name',function(req,res){
    var name = req.query.name;
    names.push(name);
    res.send(JSON.stringify(names));
});

app.get('/:articleName',function (req,res){
    var articleName = req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

function createTemplate(data){
    var title = data.title;
    var heading = data.heading;
    var date = data.date;
    var content = data.content;
    
    var htmlTemplate = `
        <html>
        <head>
            <title>
               ${title}
            </title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet"/>
        </head>
        <body>
            <div class="container">
                <div>
                     <a href='/'> Home</a>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                   ${data}
                </div>
                <div>
                   ${content}
                </div>
            </div>
        </body>
    </html>`
    ; 
    return htmlTemplate;
}
