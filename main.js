/*
const fs = require('fs');
const express = require('express');
const app = express();
//add body parser
const bodyParser = require('body-parser');

//MongoClient через нього ми підключаємось до бази данних 
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

    // Add file for saving data
    // Install mongo db
    // Add mongoose



//we tild express lets work with all requests data resieved like json daat.
app.use(bodyParser.json());

app.get('/*', (req, res) => {
    res.setHeader('Content-Type', 'text/html; charset=utf8');
    console.log('Request recieved url', req.url);
    let fileName = './site' + req.url;
    //If page exist we just render it 
    if (fs.existsSync(fileName)) {
        let content = fs.readFileSync(fileName, { encoding: 'utf8' });
        res.write(content);
    }
    //else render 404
    else {
        let content = fs.readFileSync('./site/404.html', { encoding: 'utf8' });
        res.status(404);
        res.write(content)
    }
    res.end();
});


//lets create one more hendler for POST 
app.post('/save', (req, res) => {

    console.log('POST request have come', req.body);
    //Add new file and write data to it but we will add in more advanced concept, because as we add it simplly for all new request we will rewrite all old data for first time in this file be just empty array 

    //we grab all old data from file 
    let content = fs.readFileSync('./posts.txt', { encoding: 'utf8' });

    //we need to convert it 
    let items = JSON.parse(content);
    //push new data there
    items.push(req.body);

    //and rewrite 
    fs.writeFileSync('./posts.txt', JSON.stringify(items));
    res.end();
});

app.listen(8888);



    // Сервер це така система управіління базами данних яка висить постійно і чекає коли до неї будуть відправлятися запити 
    // Монго всередині себе зберігає дані у вигляді колекцій, які схожі на таблиці


// Connect to the db дефолтне підключенн до монго

MongoClient.connect("mongodb://localhost:27017", function (err, database) {
    if (err) {
        console.log(err);
    }
    else {
        let post = {
            title: 'Hello, MongoDB',
            data: 080218,
            text: 'You are awesome'
        };

        var db = database.db('admin');

        // db.collection('admin').insert({'name': "Bob"});
        // db.collection('blog').insert(post);
    }
});

//We are did it - we saved data to the database. But we have a simplier methods for all of that. mongoose

mongoose.connect('mongodb://localhost/admin');

//В монгус все тут складається з моделей. А модель це - опис данних

//ми тут описали модель. Ми тут сказали що є модель postname. Модель в собі містить такі наступні дані title, data, text - і їх типи 
const Post = mongoose.model('PostName', { 
    title: String,
    data: String,
    text: String
});

const post = new Post(
    { 
        title: 'Zildjian',
        data: 'Mongoose',
        text: 'mongoose nice to meet you'
    }
);
post.save().then((res) => console.log(res));
    
*/


/*
//перпишемо все і підключення монгуса до db поставимо зверху
//Простий робочий приклад дадавання в локальну базу данних
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs  = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');

mongoose.connect('mongodb://localhost/admin');

const Post = mongoose.model('PostName', { 
    title: String,
    data: String,
    text: String
});


app.use(bodyParser.json());
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


// app.get('/*', (req, res) => {
//     res.setHeader('Content-Type', 'text/html; charset=utf8');
//     console.log('Request recieved url', req.url);
//     let fileName = './site' + req.url;
//     if (fs.existsSync(fileName)) {
//         let content = fs.readFileSync(fileName, { encoding: 'utf8' });
//         res.write(content);
//     }
//     else {
//         let content = fs.readFileSync('./site/404.html', { encoding: 'utf8' });
//         res.status(404);
//         res.write(content)
//     }
//     res.end();
// });


let temple = ``;

// app.get('/site/posts.html', (req, res) => {
//     Post.find({}).then(post => {
//         post.map(el => {
//             return temple = `
//                 <ul>
//                     <li>${el.title}</li> 
//                     <li>${el.data}</li>
//                     <li>${el._id}</li>
//                 </ul>
//             `;
//         })
//     });
//     res.render(temple);
//     res.end();
// });

// Все просто в метод render ми передаємо імя шаблону і дані дяку ми хочемо передати
app.get('/', (req, res) => {
    Post.find({}).then(posts => {
        res.render('index', {items: posts})
    });
});

app.get('/start.html', (req, res) => {
    res.render('start')
});

app.post('/save', (req, res) => {
    console.log('POST request have come', req.body);
    const post = new Post(req.body);
    console.log(req.body)
    post.save().then((res) => console.log(res))
    res.end();
});

nodemailer.createTestAccount((err, account) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
               user: 'nazariymurall@gmail.com',
               pass: 'NAZIK2012'
           }
       });

    let mailOptions = {
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'nazariymurall@gmail.com, nazik_94@ukr.net', // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        html: '<b>Hello world?</b>' // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
    });
});

app.listen(8888);
*/

//перпишемо все і підключення монгуса до db поставимо зверху
//Простий робочий приклад дадавання в локальну базу данних
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');


app.use(bodyParser.json());
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');


mongoose.connect("mongodb://nazik2012:NAZIK2012@first-shard-00-00-9q31y.mongodb.net:27017,first-shard-00-01-9q31y.mongodb.net:27017,first-shard-00-02-9q31y.mongodb.net:27017/test?ssl=true&replicaSet=first-shard-0&authSource=admin");


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('mongoose was connected successfully');
    DevicesModel.find((err, res) => {

    })
});


const devicesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    model: String,
    price: Number,
    os: String
});

const DevicesModel = mongoose.model('Devices', devicesSchema);
const device = new DevicesModel({
    _id: new mongoose.Types.ObjectId(),
    model: 'Pixel',
    price: 668,
    os: 'Android'
})

DevicesModel.find((err, res) => {
    console.log(res)
})

// device.save();
// .then((res) => console.log(res))
// .catch(err => console.error(err));


app.get('/', (req, res) => {
    DevicesModel.find({})
        .then(devices => {
            res.render('index', { items: devices })
        });
});

app.listen(8888);


