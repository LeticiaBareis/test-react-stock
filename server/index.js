const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const fs = require('fs');
const csv = require('fast-csv');
const cors = require('cors');
const mysql = require('mysql')
const multer = require('multer')
const path = require('path')
app.use(express.static("./public"))
app.use(express.json())
// body-parser middleware use
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({
    extended: true
}))

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "36447811Le!",
    database: "db_sistema_stock",

})
db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
})
//! Use of Multer
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, './uploads/')    
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
var upload = multer({
    storage: storage
});
//! Routes start
//route for Home page
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

//! Routes start
//route for Home page
app.get('/list', (req, res) => {
    db.query("SELECT * FROM db_sistema_stock.stock", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
      });
});
//@type   POST
// upload csv to database
app.post('/uploadfile', upload.single("uploadfile"), (req, res) =>{
    console.log( req.file);
    UploadCsvDataToMySQL(__dirname + '/uploads/' + req.file.filename);
    console.log('CSV file data has been uploaded in mysql database ' + err);
});

app.post('/parametros', (req, res) =>{
     let query = 'INSERT INTO db_sistema_stock.status (otimo_status, critico_status) VALUES (?)';
     console.log(req.body)
    db.query(query, [[req.body.otimo_status,req.body.critico_status]], (error, response) => {
        console.log(error || response);
    });
});

app.get('/parametros', (req, res) => {
    db.query("SELECT * FROM db_sistema_stock.status", function (err, result) {
        if (err) throw err;
        console.log(result);
        res.end(JSON.stringify(result));
      });
});

function UploadCsvDataToMySQL(filePath){
    let stream = fs.createReadStream(filePath);
    let csvData = [];
    let csvStream = csv
        .parse()
        .on("data", function (data) {
            csvData.push(data);
        })
        .on("end", function () {
            // Remove Header ROW
            csvData.shift();
            // Open the MySQL connection
            /*db.connect((error) => {
                if (error) {
                    console.error(error);
                } else {*/
                    let query = 'INSERT INTO db_sistema_stock.stock (date_order, open_order, high, low, close_order, volume_order) VALUES ?';
                    db.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                    });
           //     }
           // });
            
            // delete file after saving to MySQL database
            // -> you can comment the statement to see the uploaded CSV file.
            fs.unlinkSync(filePath)
        });
 
    stream.pipe(csvStream);
}
//create connection
const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))