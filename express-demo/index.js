const sqlite3 = require('sqlite3').verbose();
const request = require('request');
const cheerio = require('cheerio')
// const db = new sqlite3.Database('./web.db',sqlite3.OPEN_READWRITE,(err)=>{
// if (err) {
//     console.error(err.message);
// }
// console.log('Connected to the database.');
// });

// db.run(
//     'CREATE TABLE website(id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, url TEXT, filename TEXT, created_at DATETIME DEFAULT CURRENT_TIMESTAMP,image TEXT,desc TEXT)'
// );

// const sql = `INSERT INTO website(name,url,filename,image,desc) VALUES(?,?,?,?,?)`;

// db.run(sql,['Google','https://www.google.com','{}','https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png','Google Search Engine'],(err)=>{
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('a new website inserted');
// });

// const sql = `SELECT * FROM website`;

// db.all(sql,(err,rows)=>{
//     if (err) {
//         console.error(err.message);
//     }
//     // console.log(rows);
//     rows.forEach((row)=>{
//         console.log(`${row.id} ${row.name} ${row.url} ${row.filename} ${row.created_at}`);
//     }); 
// });




// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Closed the database connection.')
// });
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep books
let bodys = [];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const fs = require('fs');

app.post('/url', (req, res) => {
    const data = req.body;
    
    // Output the book to the console for debugging
    console.log(data);
    bodys.push(data);

    
    
    const sql_insert = `INSERT INTO website(name,url,filename,image,desc) VALUES(?,?,?,?,?)`;
    
    const db = new sqlite3.Database('./web.db',sqlite3.OPEN_READWRITE,(err)=>{
        if (err) {
            console.error(err.message);
        }
        console.log('Connected to the database.');
        });
            
    const sql = `SELECT * FROM website`;
    
    db.all(sql,(err,rows)=>{
        if (err) {
                console.error(err.message);
            }
            // console.log(rows);
            let data_exist = false;
        // data_exist = rows.find(row => row.url === data.url);
        console.log(data_exist);    
        rows.forEach((row)=>{
            if (row.name == data.name) {
                console.log(`${row.id} ${row.name} ${row.url} ${row.filename} ${row.created_at}`);
                data_exist = true;

                fs.readFile('./gg.txt', 'utf8', function(err, html){
                    // console.log(html);
                    const $ = cheerio.load(html);
// var paragraph = $('p').html();
var paragraph = $('img').attr('src');
// console.log($('div.mngb').contents().filter( function() {
//     return this.type === 'text';
// }).text());
console.log(paragraph);
                });
//                
//                 


            }
            // console.log(rows);
           


            }); 

           if (data_exist == false) {

            console.log('data_exist false');
            const filename = `${data.name}.txt`;
            console.log(filename);
            request('https://www.google.com', function (error, response, body) {
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                fs.writeFile(filename, body, (err) => {
                    if (err) throw err;
                
                    console.log('response saved!');
                });
           

            //  db.run(sql_insert,[data.name,data.url,filename,'{}','{}'],(err)=>{
            // if (err) {
            //         console.error(err.message);
            //         console.log('insert error inserted');
            //     }
            //     console.log('a new website inserted');
            // });
            // db sinserted
        });

           }


});


app.get('/url',(req,res) =>{
    const website = sql
    res.status(200).json({website});  
});

db.close((err) => {
        if (err) {
                console.error(err.message);
            }
            console.log('Closed the database connection.')
        });
        
        res.send('url is added to the database');
        
    });
    

    app.listen(port, () => console.log(`server started at localhost:3000 ${port}!`));